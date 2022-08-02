import BoardModel from "./../models/board.model";
export default class {
  static async save(req, res) {
    const { emal, title, username, content } = req.body;
    const board = new BoardModel({
      emal,
      title,
      username,
      content,
    });
    try {
      const data = await board.save();
      req.session.message = "您的留言已经提交成功!";
      res.redirect("/board/view");
    } catch (e) {
      req.session.message = "您的留言已经提交失败!";
      res.redirect("/");
    }
  }

  static async list(req, res) {
    const data = await BoardModel.find({}).sort({ _id: -1 });
    const message = req.session.message;
    req.session.message = "";
    res.render("www/board", {
      data,
      message,
    });
  }
}
