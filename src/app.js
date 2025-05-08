const express= require('express')

const app= express()


app.use("/test",(req, res)=>{
      res.send("hello from dashboard")
})


app.listen(3000, ()=>{
    console.log("Server is successfully running on port 3000")
})