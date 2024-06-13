const mongoose = require('mongoose');
// import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Roxy:1227@cluster0.0jtxmdi.mongodb.net/BD?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('连接成功')
}).catch(e => {
    console.log('连接失败:', e)
})

module.exports = mongoose
// export default mongoose