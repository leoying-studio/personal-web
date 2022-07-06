import User from "../models/user.model";
import UserModel from "../models/user.model";
import adminConfig from './../config/admin.json'
export default class {
  
  static query(req, res, next) {
    if (req.session.username) {
      next();
    } else {
      res.redirect("/sign-in/view");
    }
  }

  static async applyAccount(req, res, next) {
    const count = await User.count()
    if (count) {
      return next()
    }
    const user = new UserModel({
      nickname: '不打烊的小黄人', 
      ...adminConfig
    })
    user.save(function() {
      next()
    })
  }
}
