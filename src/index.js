const express = require('express');
const router = express.Router();
const Web3 = require("web3");
const web3 = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
const Refreal = require("../schema/refrealSchema");
const Transaction = require("../schema/transactionSchema");

exports.postRefreal = async (req, res) => {
    try {
        const {
            userRefral,
            ownerRefral
        } = req.body;
        // create owner refral//
        if (!ownerRefral || ownerRefral == null || ownerRefral == undefined) {
            res.send({
                result: "Please provide owner Refral",
                success: false
            })
        } else if (!userRefral || userRefral == null || userRefral == undefined) {
            res.send({
                result: "Please provide user Refral",
                success: false
            })
        } else {
            let owner = await Refreal.findOne({
                ownerRefral: ownerRefral
            });
            if (owner != null) {
                let checkUser = owner.refrals.find((item) => {
                    if (item == userRefral) {
                        return true;
                    }
                })
                if (checkUser == undefined) {

                    owner.refrals.push(userRefral);
                    await owner.save();
                    res.send({
                        msg: "user Add Referral"
                    })
                } else {
                    res.send({
                        msg: "user already exist"
                    })
                }
            } else {
                const refral = new Refreal();
                refral.ownerRefral = ownerRefral;
                refral.refrals.push(userRefral);
                await refral.save();

                res.send({
                    msg: "Add Referral"
                })
            }
            
        }

    } catch (e) {
        console.log("error while post refreal", e);
        res.send({
            success: false
        })
    }
}

exports.getRefreal = async (req, res) => {
    try {
        const {
            ownerRefral
        } = req.body;

        if (!ownerRefral || ownerRefral == null || ownerRefral == undefined) {
            res.send({
                success: false,
                result: "Please provide wallet refral"
            })
        } else {
            let owner = await Refreal.find({
                ownerRefral
            });
            if (owner == null) {
                res.send({
                    success: false,
                    result: "No Refaral in DB"
                })
            } else {
                res.json(owner);
            }
        }

    } catch (e) {
        console.log("error while post refreal", e);
        res.send({
            success: false
        })
    }
}
exports.getTransaction = async (req, res) => {
    const hash = req.body.hash;
    console.log("result.status", hash);
    try {
        let result = await web3.eth.getTransactionReceipt(hash);
        
        if (result.status) {
            res.send({
                success: true,
                result: result.status
            })
        } else {
            res.send({
                success: true,
                result: "Failed"
            })
        }

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            error: "Pending"
        })
    }
};



exports.postTransaction = async (req, res) => {
    try {
        let {
            toAddress,
            fromAddress,
            amount,
            id
        } = req.body;
        let transaction = await new Transaction()
            transaction.toAddress = toAddress;
            transaction.fromAddress = fromAddress;
            transaction.id = id;
            transaction.amount = amount;
            await transaction.save();
            res.send({result:"data save"})
    } catch (e) {
        console.log("error while save transactions", e);
    }
}

exports.getTransactionDetail = async (req, res)=>{
    try{
        let {address}= req.body;
        let result =  await Transaction.find({id:address}).sort({'_id':-1}).limit(5)
        res.send(result)

    }catch(e){
        console.log("error while get transaction detail", e);
    }
}

exports.postEvents = async (req, res) => {
    try {
        let {
            hash,
            toAddress,
            fromAddress,
            amount,
            id
        } = req.body;

        let result = await web3.eth.getTransactionReceipt(hash);
        if(result.status){
        let transaction = await new Transaction()
            transaction.toAddress = toAddress;
            transaction.fromAddress = fromAddress;
            transaction.id = id;
            transaction.amount = amount;
            await transaction.save();
            res.send({
                success: true,
                result: result.status
            })
        }else{
            res.send({
                success: true,
                result: result.status
            })
        }
    } catch (e) {
        console.log("error while save transactions", e);
    }
}
