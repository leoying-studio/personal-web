import UserService from './../services/user.service';
export default class {

    static async signIn(req, res, next) {
        const body = req.body;
        try {
           const user = await UserService.login(req)
           if (user) {
               res.redirect("/admin")
           } else {
               res.render("sign-in/index", {  message: '账号或者密码错误'})
           }
        } catch(e) {
            console.log(e, 'sign-in')
            res.render("sign-in/index", {
                message: '登录失败'
            })
        }
    }

    static async signOff(req, res, next) {
        req.session.destroy(function(err) {
            if(err){
              res.redirect('/admin');
              return;
            }
            res.clearCookie("username");
            res.redirect('/');
        });
    }
}