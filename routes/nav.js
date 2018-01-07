let express = require('express');
let router = express.Router();
let NavControll = require("./../controlls/nav");
let Utils = require("./../utils");

router.post("/submit", NavControll.submit);
router.post('/addCategory', NavControll.addCategory);
module.exports = router;
