const mongoose= require('mongoose')
const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://nodebackened:nodebackened000@nodebackened.hutik.mongodb.net/namastenode")
}

module.exports= connectDb