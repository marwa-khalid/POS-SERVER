const express = require("express");
const router = express.Router();
const Order = require("../Model/Order");
const Product = require("../Model/Product");

router.post("/",async(req,res)=>{  
  const newOrder = new Order(req.body);  
  for(const productData of req.body.products){
    const productId = productData.productId;
    const product = await Product.findById(productId);
    const updatedSize = product.sizeQuantityPairs.find((pair)=>
      pair.size === productData.size
      
    );
    if(updatedSize){
      if (updatedSize.quantity < productData.quantity) {
        return res.status(400).json({ message: "Not enough items in stock" });
      }

      updatedSize.quantity -= productData.quantity;
      await product.save();
    }
  }
    try{   
       await newOrder.save();
       res.status(200).json({message:"Order placed"})
    } catch(error){
        res.send(error)
    }
    
}) 


router.get('/', async (req, res) => {
    try {
      
      const userOrders = await Order.find();  
      res.json(userOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      order.status = req.body.status;
      if(req.body.status === "Cancelled"){
        for(const productData of order.products){
          const productId = productData.productId;
          const product = await Product.findById(productId);
          const updatedSize = product.sizeQuantityPairs.find((pair)=>
            pair.size === productData.size
            
          );
          if(updatedSize){
            updatedSize.quantity += productData.quantity;
            await product.save();
          }
        }
      }
      const updatedStatus = await order.save();
      res.json(updatedStatus);
    }
    catch (error) {
      return res.status(404).json(error);
    }
  });


module.exports= router;