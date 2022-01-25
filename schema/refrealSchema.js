const mongoose = require("mongoose");


const refrealSchema = mongoose.Schema({
   
    ownerRefral:{
        type:String,
        required:true
    },
    refrals:[{
        type:String,
        required:true,
    }],
});

let refrealModal = mongoose.model("Refral", refrealSchema);

module.exports = refrealModal;