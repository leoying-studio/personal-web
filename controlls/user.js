
var UsersModel = require("./../models/users");
var Body = require("./body");
var DBSuper = require("./../db/index");
var Utils = require("./../utils");

exports.loginView = function(req, res, next) {
    // LoginDAL.getNavs().then(function(doc) {
	// 	res.render("login", Body({navs: doc}));
	// });
}


exports.registerView = function(req, res, next) {
    // RegisterDAL.getNavs().then(function(doc) {
	// 	res.render("register", Body({navs: doc}));
	// });
}

exports.registerSubmit = function(req, res) {
	const {username, password, passAgain, email} = req.body;
    try {
        if (!username) {
            throw new Error("用户名不能为空!");
        }
        if (password.length < 6) {
            throw new Error("密码长度不能小于6个!");
        }
        if (password !== passAgain) {
            throw new Error("两次密码输入不一致");
        }
        if (!email) {
            throw new Error("邮箱不能为空");
        } 
        if (!Utils.validateEmail(email)) {
            throw new Error("邮箱格式不合法");
        }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/regview");
    }

    // 查询当前用户名是否注册
    User.findOne({username}).then((error, user) => {
        if (user) {
            req.flash("error", "当前用户名已经存在");
            res.redirect("/regview");
        }
        if (!error) {
            // 开始注册
            new User({
                username,
                password,
                passAgain,
                email,
            }).save((err, res) => {
                if (err) {
                    req.flash("error", "注册失败");
                } else {
                    req.flash("success", "注册成功");
                }
                res.redirect("/regview");
            })
        }
    });
}


exports.loginSubmit = function(req, res, next) {
	var params = req.query;
	var username = params.username;
	var password = params.password
	var password = params.password;
	try {
		if (!username) {
			throw new Error("用户名不能为空");
		}
		if (!password) {
			throw new Error("密码不能为空");
		}
	
	}catch(e) {
		req.flash("error", e.message);
		return res.redirect("login");
	}

	username = username.replace(/\s/g, "");
	password = password.replace(/\s/g, "");

	DBSuper.findOne({
		model: UsersModel,
		conditions: {
			username,
			password
		}
	}).then(function(doc) {
		if (doc) {
			req.session.username = username;
			if (username !== "admin") {
				return res.redirect("/");
			}
			return res.redirect("manager");
		}
		res.redirect("login");
	}, function(err) {
		console.log("查询用户失败", err);
	});	
}