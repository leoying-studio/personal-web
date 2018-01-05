var express = require('express');
var router = express.Router();
var HomeControlls = require("./../controlls/home");


router.get("/", HomeControlls.getAll);

module.exports = router;