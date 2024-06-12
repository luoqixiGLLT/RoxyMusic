// import mongoose from "mongoose";
const mongoose = require('mongoose');

mongoose.connect('mongodb://Roxy:27017/BD').then(e => {
    console.log('连接成功: http://localhost:3001')
}).catch(e => {
    console.log(e)
})

// export default mongoose
module.exports = mongoose