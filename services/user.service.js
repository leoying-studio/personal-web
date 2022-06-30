import UserModel from './../models/user.model'
export default class UserService {

    static async login(req) {
        const { username, password } = req.body
        const user = await UserModel.$findOne(username, password);
        if (user) {
            req.session.username = user.username;
        } 
        return user
    }
}