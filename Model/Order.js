const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    
    invoiceNumber:{
      type:String,
      required:true
    },
    customerName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    products:[{
      name:{
        type:String,
        required:true
      },
      quantity:{
        type: Number,
        required:true
        
      },
      image:{
        type:String,
        required:true
      },
      size:{
        type:String,
        required:true
      },
      productId:{
        type:String,
        required:true
      }
    }],
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Processing",
        required:true
    }
    
 
},
{ timestamps: true }
)
module.exports = mongoose.model("Order",OrderSchema);