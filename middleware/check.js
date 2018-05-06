module.exports = {
    login: function (req, res, next) {
        if (!req.session.user &&　req.url === '/manager') {
            req.flash('error', '未登录');
            return res.redirect('/user/login/view');
        }
        next();
    }
}