const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/BD').then(e => {
    console.log('连接成功: http://localhost:3001')
}).catch(e => {
    console.log(e)
})

module.exports = mongoose