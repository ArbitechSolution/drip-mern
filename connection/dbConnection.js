const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/myDatabase";
// const db = "mongodb+srv://blockchainuser:blockchainuser2580@cluster0.yq58x.mongodb.net/blockchain?retryWrites=true&w=majority"
// const db = "mongodb://CSE:Penguin91!.@tmt-shard-00-00.zsfzj.mongodb.net:27017,tmt-shard-00-01.zsfzj.mongodb.net:27017,tmt-shard-00-02.zsfzj.mongodb.net:27017/CSE?ssl=true&replicaSet=atlas-b7t1lb-shard-0&authSource=admin&retryWrites=true&w=majority"
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDB successfully connected') 
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;