const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");
const purchaseRoute = require("./Routes/Purchase");
const salaryRoute = require("./Routes/Salary");

const DB = "mongodb://marwakhalid:marwamarwa@marwa-shard-00-00.x9zjp.mongodb.net:27017,marwa-shard-00-01.x9zjp.mongodb.net:27017,marwa-shard-00-02.x9zjp.mongodb.net:27017/POS?ssl=true&replicaSet=atlas-6szo5v-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.connect(DB,{}).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log("no connection"));


app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/order",orderRoute);
app.use("/api/purchase",purchaseRoute);
app.use("/api/salary",salaryRoute);

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}/`);
});
