import BoardModel from './../models/board.model';

export default class {

    static async save(req, res) {
        const {emal, title, username, content} = req.body;
        const board = new BoardModel({
            emal, 
            title,
            username,
            content
        });
        try {
            const data = await board.save();
            res.redirect("/")
        } catch(e) {
            res.redirect("/")
        }
    }

    static async list(req, res) {
        const data = await BoardModel.find({}).sort({"_id": -1});
        res.render("www/board", {
            data
        })
    }
}