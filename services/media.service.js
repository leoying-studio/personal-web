import multer from  "multer"
import { MediaModel } from './../models/media.model'

export default class MediaService {

    static uploadConfig(count) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                //上传到path变量所指定的位置
                cb(null, 'public/uploads/')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() +"_"+ file.originalname)
            }
        })

        const upload = multer({ storage });

        if (count === 1) {
            return upload.single("image")
        }

        return upload.array("images")
    }

    static start(req, res) {
        const uploder = MediaService.uploadConfig(1)
        const promise = new Promise;
        uploder(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                return promise.reject(err)
            } else if (err) {
                return promise.reject(err)
            }
            const {filename, size, mimetype, originalname}  = req.file;
            const doc = new MediaModel({
                name: filename,
                size,
                mimeType: mimetype,
                originalName: originalname
            })
            doc.save(function(err, res) {
                if (err) {
                    promise.reject(err)
                } else {
                    promise.resolve(filename)
                }
            })
        })
        return promise;
    }
}