const express = require("express");
const router = express.Router();
const Product = require("../Model/Product");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/AddProduct", upload.single('image'), async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, description,  category, barCodeNo, sizeQuantityPairs } = req.body;
    const image = 'uploads/' + req.file.filename;

    // Create a new Product with image, quantity, and category
    const productDetails = new Product({
      name: name,
      price: price,
      description: description,
      image: image,
      category: category,
      barCodeNo: barCodeNo,
      sizeQuantityPairs : sizeQuantityPairs
    });
    

    console.log(productDetails);
    await productDetails.save();
    console.log(productDetails);
    return res.send({ message: "Successfully added product" });
  } catch (error) {
    return res.status(500).send({ message: "Failed to add product" });
  }
});


router.get("/",async(req,res)=>{
    try{
        const product= await Product.find();
        res.json(product);
    }
    catch (error){
        console.error("Error fetching products:", error);
     res.status(500).json({ error: "Internal Server Error" });
   
};
});


router.get("/:id",async(req,res)=>{
    try{
        const productId =req.params.id;
        const product= await Product.findById(productId);
        res.json(product);
    }
    catch (error){
        console.error("Error fetching products:", error);
     res.status(500).json({ error: "Internal Server Error" });
   
};
});
//barcode
router.get("/barcode/:barcode",async(req,res)=>{
  try{
    const barcode = req.params.barcode;
    console.log(barcode);
    const targetProduct = await Product.findOne({barCodeNo:barcode});
    console.log(targetProduct);
    res.json(targetProduct);
    
  }
  catch(error){
    console.error("error fetching product",error);
    res.status(500).json({error: "internal server error"});
  };
});


router.put("/:id", upload.single('image'), async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, description, quantity, category,barCodeNo,sizeQuantityPairs } = req.body;
      let image = null;
  
      if (req.file) {
        // If a new image is provided, update the image path
        image = 'uploads/' + req.file.filename;
      }
  
      // Find the existing product by ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      product.name = name;
      product.price = price;
      product.description = description;
  
      if (image) {
        product.image = image;
      }
  
      product.quantity = quantity;
      product.category = category;
      product.barCodeNo = barCodeNo;
      product.sizeQuantityPairs = sizeQuantityPairs;
  
      // Save the updated product
      await product.save();
      return res.send({ message: "Product updated successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Failed to update product" });
    }
  });
  

router.delete("/:id",async (req,res)=>{
    try {
        const productId = req.params.id;
        await Product.findByIdAndDelete(productId);
        return res.send({message:"product deleted"});
    }catch(err){
        res.status(500).json({error: "internal server error"});
    }
})

// router.post("/:id",async (req,res)=>{
//   try{
//     const productId = req.params.id;
//     const {size,quantity} = req.body;
//     const product = await Product.findById(productId);
//     const updatedSize = product.sizeQuantityPairs.find
    
//   }
// })
module.exports=router;