const express = require("express");
const app = express()
var cors = require('cors');
app.use(cors());
// let path = require("path");
const connectDB = require("./connection/dbConnection")
const userRoutes = require("./src/Routes")


app.use(express.json());
app.use('/api/users', userRoutes);

var PORT = process.env.PORT || 5005;

let server = app.listen(PORT, ()=>{
    connectDB();
    console.log("Drip server running on", PORT);
});
//@info server will be closed in case of any unhandledRejection
process.on('unhandledRejection', error => {
    console.log('unhandledRejection',error.message);
    server.close(() => process.exit(1));
});