const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    toAddress:{
        type:String,
        required:true
    },
    fromAddress :{
        type:String,
        require:true
    },
    amount:{
      type:String,
      required:true  
    },
    id:{
        type:String,
        require:true
    }
})

let transactionlModal = mongoose.model("Transaction", transactionSchema);
module.exports = transactionlModal;