const express = require('express');
const router = express.Router();
const Web3 = require("web3");
const webSupply = new Web3('https://api.avax-test.network/ext/bc/C/rpc');
const Refreal = require("../schema/refrealSchema");
const Transaction = require("../schema/transactionSchema");
const TreeReferral = require("../schema/treeReferral");
const OwnerRefreal = require("../schema/ownerRefrealSchema");
const Referre = require("../schema/referrer")
const TreeReferrs = require("../schema/referrer")

const {
    abi,
    address
} = require("./utils");
const { db } = require('../schema/refrealSchema');
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
        res.send({
            result: "data save"
        })
    } catch (e) {
        console.log("error while save transactions", e);
    }
}

exports.getTransactionDetail = async (req, res) => {
    try {
        let {
            address
        } = req.body;
        let result = await Transaction.find({
            id: address
        }).sort({
            '_id': -1
        }).limit(5)
        res.send(result)

    } catch (e) {
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

        let result = await webSupply.eth.getTransactionReceipt(hash);
        console.log(result.status);
        if (result.status) {
            let transaction = await new Transaction()
            transaction.toAddress = toAddress;
            transaction.fromAddress = fromAddress;
            transaction.id = id;
            transaction.amount = amount;
            await transaction.save();
            res.send({
                success: true,
                result: "result.status"
            })
        } else {
            res.send({
                success: true,
                result: "not saved"
            })
        }
    } catch (e) {
        console.log("error while save transactions", e);
    }
}

exports.treeReferral = async (req, res) => {
    try {
        const {
            userId,
            referee
        } = req.body;
        let contract = new webSupply.eth.Contract(abi, address);
        let buddyData = await contract.methods.buddyOft(userId).call()
        // create owner refral//
        if (!referee || referee == null || referee == undefined) {
            res.send({
                result: "Please provide owner Refral",
                success: false
            })
        } else if (!userId || userId == null || userId == undefined) {
            res.send({
                result: "Please provide user Refral",
                success: false
            })
        } else {
            let data = await Referre.findOneAndUpdate({
                referrer: userId
            });
            if (data == null) {
                let ref = new Referre();
                console.log("ref 235", ref);
                ref.referrer = userId;
                for (let i = 0; i < 15; i++) {
                    ref.referre.push([])
                }
                ref.referre[0].push(referee)
                await ref.save();
                res.status(200).send({
                    msg: ref
                })
            } else {
                // let ref= new Referre();
                db.collection("Referre").findOneAndUpdate(
                    {_id:data._id},{$push: {"referre$[0]":referee}} )
                // console.log("data 247",data);
                // data.referre.forEach(async(item)=>{
                //     item.push(referee)

                // })
                // await data.save()
                await res.status(200).send({
                        msg: data
                 
                })
            }

        }
    } catch (e) {
        console.log("error while post refreal", e);
        res.status(500).send({
            msg: "failed"
        })
    }
}


exports.getTreeRef = async (req, res) => {
    try {
        // let {owner} = req.body;
        // let data = await TreeReferral.findOne({owner:owner})
        // let contract = new webSupply.eth.Contract(abi, address);
        // let method = await contract.methods
        // console.log("method", method);
        let tree = await Referre.find();
        // tree.referrer = req.body.owner;
        // await tree.save();
        res.status(200).json(tree);
    } catch (e) {
        console.log("error while get tree ref", e);
    }
}