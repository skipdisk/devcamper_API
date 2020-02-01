const mongoose = require('mongoose');

const connectDB = async () => { //URI stored inn config.env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`MongpDb Connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB