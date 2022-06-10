import MediaService from "./../services/media.service"

export default class CateController {
    
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
    
}

