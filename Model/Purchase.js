const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  warehouseName: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  sizeQuantityPairs: [{
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: Number,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    barCodeNo:{
      type:String,
      required:true
    },
    totalAmount:{
      type:Number,
      required:true
    }
  }],
},
{ timestamps: true });

module.exports = mongoose.model("Purchase", PurchaseSchema);
