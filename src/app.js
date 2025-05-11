const express= require('express')
const connectDb= require('./config/database')
const cookieParser= require("cookie-parser")
const authRouter= require("./routes/auth")
const profileRouter= require("./routes/profile")
const requestRouter= require("./routes/request")



const app= express()

app.use(express.json())
app.use(cookieParser())


app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)




// app.get("/user", async(req, res)=>{
//    const userEmail= req.body.emailId
//    try{
//     const users=  await User.find( {emailId:userEmail})
//     if(users.length===0){
//         res.status(404).send("User not found")
//     }
//     else{
//         res.send(users)
//     }
//    }catch(err){
//       res.status(400).send("Something went wrong")
//    }
// })
// app.get("/feed", async(req, res)=>{
//   try{
//     const users= await User.find({})
//     res.send(users)
//   }
//   catch(error){
//     res.status(400).send("Something went wrong")
//   }
// })
// app.delete("/user", async(req,res)=>{
//     const userId= req.body.userId
//     try{
//         const user= await User.findByIdAndDelete(userId)
//         res.send("User deleted successfully")
//     } catch(error){
//         res.status(400).send("Something went wrong")
//       }
// })
// app.patch('/user/:userId', async(req, res)=>{
//     const userId= req.params?.userId
//     const data= req.body
//     try{
//         const ALLOWED_UPDATE=["firstName", "lastName", "gender", "age"]
//         const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATE.includes(k))
//         if(!isUpdateAllowed){
//              throw new Error("Update not allowed")
//         }
//         const user= await User.findByIdAndUpdate(userId, data, {runValidators:true})
//         res.send("user updated successfully")
//     }catch(err){
//         res.status(400).send("Update failed"+ err.message)
//     }
// })

connectDb().then(()=>{
    console.log("Database connection is established")
    app.listen(3000, ()=>{
        console.log("Server is successfully running on port 3000")
    })
}).catch((err)=>{
    console.err("Database connection is not established")
})
