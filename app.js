// import express
const express = require('express')
const app = express();
const mongoose = require("mongoose")

var path = require('path');

var oas3Tools = require('oas3-tools');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var swagger = expressAppConfig.getApp();

//import user routes
const userRoutes = require('./routes/user')


//initiate body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//use user routes
app.use(userRoutes);

//create database on server and on success start it.
var mongoDB = 'mongodb://localhost:27017/block-chain-db';

mongoose
  .connect(
    mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    app.use(swagger)
    app.listen(3000, () => {
        console.log("Server has started!")
    })
  })
  .catch(err => {
    console.log(err);
  });
