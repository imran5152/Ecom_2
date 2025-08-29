let express=require('express')
let app=express()
let dbconnect=require('./dbconnect')

app.get('/customer',async(req,res)=>{
    res.json('hello')
})

app.listen(2000,()=>console.log('server started'))