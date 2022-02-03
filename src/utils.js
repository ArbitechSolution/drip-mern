const address = "0x4432648CFb4028bE71F585595FDfb3dF1EC72bDb";
const  abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":true,"internalType":"address","name":"buddy","type":"address"}],"name":"onUpdateBuddy","type":"event"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"buddyOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"buddyOft","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"buddy","type":"address"}],"name":"updateBuddy","outputs":[],"stateMutability":"nonpayable","type":"function"}]

module.exports={
    address, abi
}