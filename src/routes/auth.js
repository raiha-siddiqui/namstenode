const express= require('express')
const authRouter= express.Router()
const User= require('../models/user')
const {validateSignUpData}= require('../utils/validation')
const bcrypt= require('bcrypt')



authRouter.post('/signup',async(req, res)=>{
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
authRouter.post('/login', async(req, res)=>{
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

module.exports=authRouter