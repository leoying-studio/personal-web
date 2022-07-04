import ArticlesModel from './../models/articles.model'
import ArticleService from './../services/article.service'

export default class ArticlesController {

     static async list (req, res) {
        const { pageSize, pageNo } = req.query;
        try {
            const doc = await ArticlesModel.$skip({}, pageNo, pageSize)
            const data = doc.map((item) => item.toJSON());
            res.send(data)
        } catch (e){
            console.log(e)
            res.send([])
        }
    }

    static async blogView (req, res) {
        const { pageSize = 9, pageNo = 1 } = req.query;
        try {
            const data = await ArticlesModel.$pagingQuery(pageNo - 1, pageSize - 0)
            res.render("www/blog", {
                data: {
                    ...data,
                    pageNo
                }
            })
        } catch (e){
            console.log(e)
            res.render("www/blog", {
                data: {
                    data: [],
                    pageNo,
                    total: {count: 0}
                }
            })
        }
    }

    static async one(req, res) {
        const { id } = req.query;
        try {
            const doc = await ArticlesModel.$findOne(id)
            res.json({
                data: doc,
                status: true
            })
        } catch (e){
            res.send({
                status: false,
                data: e
            })
        }
    }

    static async detailView(req, res) {
        const { id } = req.params;
        try {
            const doc = await ArticlesModel.$findOne(id)
            res.render("www/detail",{
                data: doc
            })
        } catch (e){
            res.render("/bad/error",{
                data: doc
            })
        }
    }

    static async save(req, res) {
        const body = req.body;
        const doc = await ArticleService.save(body, body.id);
        console.log(doc, 'doc')
        const data = doc.toJSON();
        res.send({
            data,
            msg: "ok",
            status: true
        })
    }

    static async remove(req, res) {
        const body = req.body;
        try {
            const doc = await ArticlesModel.$remove(body.id);
            const data = doc.toJSON();
            res.send({
                data,
                msg: "ok",
                status: true
            })
        } catch {
            res.send({
                data: null,
                msg: "error",
                status: false
            })
        }
    }
}