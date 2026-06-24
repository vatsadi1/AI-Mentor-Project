const mongoose = require('mongoose');

const ConnecttoDb = async () =>{
   await mongoose.connect(process.env.MONGODB_URI)

   console.log("Connected to DB")
}

module.exports = ConnecttoDb;