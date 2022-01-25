const mongoose = require("mongoose");
const {Schema} = require('mongoose');
// const Refral = require("./refrealSchema")
const OwnerrefrealSchema = mongoose.Schema({
    ownerRefreal={
        type:String,
        required:true

    },
    refreals = [{
        type:Schema.Types.ObjectId,
        ref:"Refral",
        required:true
    }]
});

let OwnerRefrelaModal = mongoose.model("OwnerRefreal", OwnerrefrealSchema);
module.exports = OwnerRefrelaModal;