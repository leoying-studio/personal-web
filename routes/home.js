var express = require('express');
var router = express.Router();
var HomeControll = require("./../controlls/home");

router.get("/",HomeControll.getAll);
module.exports = router;