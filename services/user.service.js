import { UserModalAccess } from './../models/user.model'
export default class UserService {

    static async login(req) {
        const { username, password } = req.body
        const user = await UserModalAccess.findOne(username, password);
        if (user) {
            req.session.username = user.username;
        } 
        return user
    }
}