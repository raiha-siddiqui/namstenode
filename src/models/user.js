const mongoose= require('mongoose')

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
        unique:true
    },
     password:{
        type:String,
        required: true,
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