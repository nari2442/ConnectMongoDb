const express = require('express')
const BrandName = require('./model')
const mongoose = require('mongoose')
const res = require('express/lib/response')
const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://narendra:narendra@cluster0.ejkbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log("Db Connected")
})



app.post('/addbrands',async (req,res)=>{
const {brandname} = req.body 
try{
const newData = new BrandName({brandname})
await newData.save()
return res.json(await BrandName.find())
}catch(err){
console.log(err.message)
}
})

app.get('/getallbrands',async (req,res)=>{
const allData =await BrandName.find()
return res.json(allData)
})

app.get('/getallbrands/:id',async (req,res)=>{
    const data = await BrandName.findById(req.params.id)
    return res.json(data)
})

//Delete API 
app.delete('/deletebrand/:id',async (req,res)=>{
    await BrandName.findByIdAndDelete(req.params.id)
    return res.json(await BrandName.find())
})

app.listen(4000,()=>{
    console.log('Server Running at http://locahost:4000')
})