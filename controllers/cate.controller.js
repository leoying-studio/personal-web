import CateService from "./../services/cate.service"
import CateModel from "./../models/cate.model"
export default class CateController {
    
    static async save(req, res) {
        const body = req.body || {};
        if (!body.label) {
            return res.send({
                msg: "请输入名称",
                status: false
            })
        }

        CateService.save(body).then((err, result) => {
            if (result > 0) {
                res.send({
                    data: result,
                    msg: "ok",
                    status: true
                })
            }
        }).catch((err) => {
            res.send({
                data: err,
                msg: "error",
                status: false
            })
        })
    }

    static async tree(req, res) {
        const treeData = await CateService.tree()
    
        console.log(treeData, 'tree')

        res.send(treeData)
    }

    static async remove(req, res) {
        const id = req.body.id
        const result = await CateModel.removeById(id)
        res.send(result)
    }

    static async update(req, res) {
        const id = req.body.id
        const result = await CateModel.$findByIdAndUpdate(id, req.body)
        res.json(result)
    }

    static async data(req, res) {
        const result = await CateModel.all()
        res.send(result)
    }
}

