const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required: true,
  },
  barCodeNo: {
    type: String,
    required: true,
  },
  sizeQuantityPairs:[{
    size:{
      type:String,
      required:true
    },
    quantity:{
      type: Number,
      required:true
      
    }
  }],
},
{ timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
