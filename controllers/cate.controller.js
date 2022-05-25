import CateService from "./../services/cate.service"
import CateModel from "./../models/cate.model"
export default class CateController {
    
    static save(req, res) {
        const body = req.body || {
            label: '小明2',
            value: '002',
            parentId: '628b54ae98f787c1eb3cf4a4'
        }
        CateService.save(body).then((err, result) => {
            if (result > 0) {
                res.send(result)
            }
        })
    }

    static async tree(req, res) {
        const treeData = await CateService.tree()
        console.log(treeData, 'tree')

        res.render('layout', {
            treeData
        })
    }

    static async remove(req, res) {
        const id = req.body.id
        const result = await CateModel.removeById(id)
        res.send(result)
    }

    static async update(req, res) {
        const id = req.body.id
        const result = await CateModel.update(id, req.body)
        res.send(result)
    }
}

