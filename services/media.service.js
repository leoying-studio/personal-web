import multer from  "multer"
import MediaModel from './../models/media.model'

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
        return new Promise((resolve, reject) => {
            uploder(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    return reject(err)
                } else if (err) {
                    return reject(err)
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
                        reject(err)
                    } else {
                        resolve(`uploads/${filename}`)
                    }
                })
            })
        })
    }
}