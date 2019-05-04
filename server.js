var express= require("express");
var app = express();


var path = require("path");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());

var connection = require("./db/connection");