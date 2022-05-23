const Categories = require('./../models/categories')

exports.save = function(data, id) {
    if (id) {
        return Categories.update(id, data)
    } 
    return new Categories(data).save()
}

/**
 *  获取树形结构
 */
exports.save = function() {

}
