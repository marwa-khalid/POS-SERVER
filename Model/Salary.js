const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({

    employeeName: {
        type: String,
        required: true,
    },
    employeeRole: {
        type: String,
        required: true,
    },
    salaryDate: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true, 
    },
    contactNumber:{
        type:String,
        required:true
    } 
},
{ timestamps: true });

module.exports = mongoose.model("Salary", SalarySchema);
