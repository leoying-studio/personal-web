let express = require('express');
let router = express.Router();
let Footer = require("./../models/footer");
let Utils = require("./../utils");

router.post("/submit", function(req,res) {
    const {background, title, descrption} = req.body;
    try {
        if (!background) {
            throw new Error("背景图不能为空!");
        }
        if (!title) {
            throw new Error("标题不能为空!");
        }
        if (!descrption) {
            throw new Error("说明不能为空");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/");
	}
	
	// 提交数据
	new Footer({
		background, title, descrption
	}).save((err, footer) => {
		if (err) {
			req.flash("error", "页脚设置失败");
		} else {
			req.flash("success", "页脚设置成功");
		}
		res.redirect("/");
	});
});

module.exports = router;
