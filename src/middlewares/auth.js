// const User= require('./models/user')
// const jwt= require('jsonwebtoken')
// const userAuth= async(req, res, next)=>{
//        try{
//         const {token}= req.cookies
//         const decodedObj= await jwt.verify(token,  "NAMASTE@NODE$000")
//         const {_id}= decodedObj
//         const user= await User.findById(_id)
//         if(!user){
//            throw new Error("user not found")
//         }
//         req.user=user
//         next()
       
//        }catch(err){
//            res.status(400).send("Something went wrong")


// }
// module.exports={userAuth}

const User= require('../models/user')
const jwt= require('jsonwebtoken')

const userAuth=async(req, res, next)=>{
      try{
         const {token}= req.cookies
         if(!token){
            throw new Error ("Token is not valid")
         }
         const decodedObj= await jwt.verify(token, "NAMASTE@NODE$000")
         const {_id}=decodedObj
         const user=await User.findById(_id)
         if(!user){
            throw new Error("User not found")
         }
         req.user=user
         next()
      }catch(err){
       res.status(400).send("ERROR "+ err.message)
      }

}
module.exports={userAuth}