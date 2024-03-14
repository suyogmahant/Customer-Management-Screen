const express =require('express')
const cors =require('cors')
const mongoose = require('mongoose')
const app = express()


app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

const schemaData =mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    city:String,
    state:String,
    country:String,
    marritalStatus:String,
    gender:String

},{
    timestamps :true
})
const userModel=mongoose.model("customer",schemaData)

app.get("/", async (req, res) => {
    let query = {};
    if (req.query.search) {
      query = { name: { $regex: req.query.search, $options: 'i' } };
    }
    const data = await userModel.find(query);
    res.json({ success: true, data: data });
  });

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data= new userModel(req.body)
    await data.save()
    res.send({success : true,message:"data saved successfully",data : data})
})
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body
    console.log(rest)
    const data =await userModel.updateOne({_id : id},rest)
    res.send({success:true,message:"data updated successfully", data : data})
})
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data= await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted successfully", data : data})


})
mongoose.connect("mongodb://localhost:27017/Customer-Management-Screen")
.then(()=>{
    console.log("db connected")
    app.listen (PORT,()=>console.log("server"))
})
.catch((err)=>console.log(err))