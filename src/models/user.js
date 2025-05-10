const mongoose= require('mongoose')
const validator= require('validator')
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        
    },
    lastName:{
        type:String,
    }, 
    age:{
        type:Number,
        min:18
    },
     emailId:{
        type:String,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid")
            }
        }
    },
     password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
               throw new Error("password must be strong")
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
       
    },
},{timestamps:true})



userSchema.methods.getJWT=async function(){
    const user= this
    const token = await jwt.sign({_id:this._id}, "NAMASTE@NODE$000",{expiresIn: "7d"})
    return token
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user= this
    const passwordHash= user.password

    const isPasswordValid=await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}
const User= mongoose.model("User", userSchema)
module.exports=User