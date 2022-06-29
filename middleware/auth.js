import UserModel from "../models/user.model";

export default class {
  
  static query(req, res, next) {
    if (req.session.username) {
      next();
    } else {
      res.redirect("/sign-in/view");
    }
  }

  static async initUser(req, res, next) {
      setTimeout(() => {
        debugger
        console.log(typeof UserModel.$count3)
        UserModel.$count3().then((res) => {
            debugger
            next()
        }).catch(() => {
            debugger
        })
      }, 400)
    //   try {
    //     const count = await UserModel.$count3();
    //     console.log(count)
    //     if (count) {
    //       next();
    //     } else {
    //       const user = new UserModel({
    //         username: "admin",
    //         password: "admin",
    //       });
    //       user.save((err, res) => {
    //         if (!err) {
    //           next();
    //         }
    //       });
    //     }
    //   } catch(e) {
    //         console.log(e)
    //   }
  }
}
