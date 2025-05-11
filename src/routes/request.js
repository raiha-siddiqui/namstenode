const express= require('express')
const requestRouter= express.Router()
const {userAuth}= require('../middlewares/auth')

requestRouter.post('/sendConnectionRequest', userAuth, async(req, res)=>{
    const user= req.user
    res.send(user.firstName +" sent connection request")
    // res.send('connection request sent')

})
module.exports= requestRouter