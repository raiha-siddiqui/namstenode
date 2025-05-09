const express= require('express')
const connectDb= require('./config/database')
const User= require('./models/user')

const app= express()

app.use(express.json())


app.post('/signup',async(req, res)=>{

        const user = new User(req.body)
        try{
            await user.save()
            res.send("User added successfully")
        }
        catch(err){
            res.status(400).send("error saving user", err.message)
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
