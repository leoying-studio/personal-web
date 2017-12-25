var express = require('express');
var router = express.Router();
var UserControll = require("./../controlls/user");

router.get('/login/view', UserControll.loginView);
router.get('/register/view', UserControll.registerView);
router.post("/login/submit", UserControll.loginSubmit);
router.post("/login/submit", UserControll.registerSubmit);

module.exports = router;
