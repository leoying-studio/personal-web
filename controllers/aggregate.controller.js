import { ArticleModalAccess} from './../models/articles.model'
export default class {
    static async recommendAndRecently(req, res) {
        const data = await ArticleModalAccess.aggregate()
        res.render("www/index", {data})
    }
}