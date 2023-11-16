const express = require("express");
const router= express.Router();
const User = require("../Model/User");

router.post("/register",async (req, res)=>{
    try{
        const { email,password,fullName} = req.body;
        const SignupDetails = new User({
            email: email,
            password: password,
            fullName : fullName
        });
        await SignupDetails.save();
        res.status(201).json({ message: 'request sent successfully.' });
    }     
 catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: 'Internal server error' });

    }
});
router.post("/login",async (req, res)=>{
      try{
        const { email,password,userType} =req.body;
        console.log(req.body)
        const user = await User.findOne({email});
        console.log(user)
        if(user && (password == user.password) && (userType == user.userType)){

            return(res.send({message:"login Successful", user:{email:user.email,userType:user.userType}}));
}

      }catch(error){
        console.error("error" , error);
        
      }
})
router.get('/', async (req, res) => {
    try {
      const cashiers = await User.find({ userType: 'Cashier' }); // Find users with userType 'Cashier'
      res.json(cashiers); // Respond with the found cashiers
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.delete("/:id",async (req,res)=>{
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        return res.send({message:"user deleted"});
    }catch(err){
        res.status(500).json({error: "internal server error"});
    }
})

module.exports=router;