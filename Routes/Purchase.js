const express = require("express");
const router = express.Router();
const Purchase = require("../Model/Purchase"); // Import your Purchase model

// Define a POST route to add a purchase
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { warehouseName, purchaseDate, sizeQuantityPairs } = req.body;

    // Create a new purchase document based on the Purchase schema
    const newPurchase = new Purchase({
      warehouseName,
      purchaseDate,
      sizeQuantityPairs,
    });

    // Save the new purchase document to the database
    const savedPurchase = await newPurchase.save();

    res.status(201).json(savedPurchase); // Respond with the saved purchase data
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the purchase." });
  }
});

router.get("/",async(req,res)=>{
    try{
        const purchase= await Purchase.find();
        res.json(purchase);
    }
    catch (error){
        console.error("Error fetching purchases:", error);
     res.status(500).json({ error: "Internal Server Error" });
   
};
});


module.exports = router;
