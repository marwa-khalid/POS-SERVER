const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:"Cashier"
    }
},
{ timestamps: true });

module.exports = mongoose.model("User",userSchema);

