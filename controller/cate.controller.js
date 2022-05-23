import CateService from "./../services/cate.service"

export default class CateController {
    
    static save(req, res) {
        const body = req.body || {
            label: '小明',
            value: '002'
        }
        CateService.save(body).then((err, result) => {
            // 保存成功
            if (result > 0) {
                res.send(result)
            }
        })
    }
}

