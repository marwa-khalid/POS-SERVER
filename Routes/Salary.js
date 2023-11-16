const express = require("express");
const router = express.Router();
const Salary = require("../Model/Salary"); 

router.post("/", async (req, res) => {
  try {
    const { employeeName, salaryDate, salary, contactNumber, employeeRole } = req.body;

    const newPurchase = new Salary({
        employeeName, 
        salaryDate, 
        salary,
        contactNumber,
        employeeRole
    });

    await newPurchase.save();

    res.status(201).json(newPurchase); 
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the salary." });
  }
});

router.get("/",async(req,res)=>{
    try{
        const salary= await Salary.find();
        res.json(salary);
    }
    catch (error){
        console.error("Error fetching salaries:", error);
     res.status(500).json({ error: "Internal Server Error" });
   
};
});

module.exports = router;
