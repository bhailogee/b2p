/**
 * Created by Wasim on 11/4/2017.
 */
var express = require("express");
var app = express();
var apis = require('./apis');

//Creating Router() object

var router = express.Router();

// Provide all routes here, this is for Home page.

app.use('/',express.static('public',{index:'index.html'}));

// Tell express to use this router with /api before.
// You can put just '/' if you don't want any sub path before routes.

app.use("/api",apis);


// Listen to this Port

app.listen(3000,function(){
  console.log("Live at Port 3000");
});