const express= require('express')
const connectDb= require('./config/database')
const User= require('./models/user')
const {validateSignUpData}= require('./utils/validation')
const bcrypt= require('bcrypt')
const cookieParser= require("cookie-parser")
const jwt= require('jsonwebtoken')
const {userAuth}= require('./middlewares/auth')

const app= express()

app.use(express.json())
app.use(cookieParser())



app.post('/signup',async(req, res)=>{
    try{
        validateSignUpData(req)
        const {firstName, lastName, emailId, password}=req.body
        const hashPassword= await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword
        })
       
            await user.save()
            res.send("User added successfully")
        }
        catch(err){
            res.status(400).send("error saving user "+ err.message)
        }
})
app.post('/login', async(req, res)=>{
       try{
               const {emailId, password}=req.body
               const user= await User.findOne({emailId:emailId})
               if(!user){
                throw new Error("Invalid credentials")
               }
               const isPasswordValid= await user.validatePassword(password)
               if(isPasswordValid){
                const token= await user.getJWT()
                res.cookie("token",token, {expires:new Date(Date.now()+8*3600000)})
                res.send("login successfull")
               }
               else{
                throw new Error("Invalid credentials")
               }
       }catch(err){
        res.status(400).send("Something went wrong")
       }
})
app.get('/profile',userAuth,  async(req, res)=>{
   try{
      const user= req.user
    res.send(user)
   }catch(err){
    res.status(400).send("Something went wrong")
   }

})
app.post('/sendConnectionRequest', userAuth, async(req, res)=>{
    const user= req.user
    res.send(user.firstName +" sent connection request")
    // res.send('connection request sent')

})
app.get("/user", async(req, res)=>{
   const userEmail= req.body.emailId
   try{
    const users=  await User.find( {emailId:userEmail})
    if(users.length===0){
        res.status(404).send("User not found")
    }
    else{
        res.send(users)
    }
   }catch(err){
      res.status(400).send("Something went wrong")
   }
})
app.get("/feed", async(req, res)=>{
  try{
    const users= await User.find({})
    res.send(users)
  }
  catch(error){
    res.status(400).send("Something went wrong")
  }
})
app.delete("/user", async(req,res)=>{
    const userId= req.body.userId
    try{
        const user= await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    } catch(error){
        res.status(400).send("Something went wrong")
      }
})
app.patch('/user/:userId', async(req, res)=>{
    const userId= req.params?.userId
    const data= req.body
    try{
        const ALLOWED_UPDATE=["firstName", "lastName", "gender", "age"]
        const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATE.includes(k))
        if(!isUpdateAllowed){
             throw new Error("Update not allowed")
        }
        const user= await User.findByIdAndUpdate(userId, data, {runValidators:true})
        res.send("user updated successfully")
    }catch(err){
        res.status(400).send("Update failed"+ err.message)
    }
})

connectDb().then(()=>{
    console.log("Database connection is established")
    app.listen(3000, ()=>{
        console.log("Server is successfully running on port 3000")
    })
}).catch((err)=>{
    console.err("Database connection is not established")
})
