const categories = require("./../services/categories")

exports.save = function(req, res) {
    const body = req.body
    categories.save(body).then((err, result) => {
        res.send(result)
    })
}