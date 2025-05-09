const mongoose= require('mongoose')
const validator= require('validator')

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

const User= mongoose.model("User", userSchema)
module.exports=User