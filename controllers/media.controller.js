import MediaService from "./../services/media.service"
import MediaModel from "./../models/media.model"

export default class MediaController {
    
    static async upload(req, res) {   
       try {
        const result = await MediaService.start(req, res)
        res.send({
            status: true,
            data: result
        })
       } catch (error) {
            res.send({
                status: false,
                data: ""
            })
       }
    }

    static async list(req, res) {   
        try {
            const docs = await MediaModel.pagingQuery({}, 0, 10)
            res.json(docs)
        } catch {
            res.json([])
        }
     }

     static async remove(req, res) {   
        const id = req.body.id
        if (!id) {
            return res.status(500).json({
                msg: 'id不能为空',
                data: null
            })
        } 
        try {
            const docs = await MediaModel.removeById(id)
            res.json(docs)
        } catch {
            res.json([])
        }
     }
}

