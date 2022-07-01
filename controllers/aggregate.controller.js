import AggregateArticles from './../services/aggregate.service'
export default class {
    static async recommendAndRecently(req, res) {
        const data = await AggregateArticles.query()
        res.render("www/index", {data})
    }
}