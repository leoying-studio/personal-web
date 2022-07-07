import ArticlesModal from './../models/articles.model'
export default class {
    static async recommendAndRecently(req, res) {
        const data = await ArticlesModal.$aggregate()
        res.render("www/index", {data})
    }
}