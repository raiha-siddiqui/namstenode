const validator= require('validator')
const validateSignUpData=(req)=>{
     const{firstName, lastName, emailId,password}=req.body
     if(!firstName|| !lastName){
        throw new Error("name is not valid")
     }
     else if(firstName<4|| firstName>50){
            throw new Error ("Name string id too long")
     } 
     else if(!validator.isEmail(emailId)){
        throw new Error ("Email id invalid")
     }
     else if(!validator.isStrongPassword(password)){
        throw new Error ("Enter strong password")

     }
}
module.exports={validateSignUpData}