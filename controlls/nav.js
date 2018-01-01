var NavModel = require("./../models/nav");
var Body = require("./body");
var Utils = require("./../utils");

// 添加导航
exports.submit = function (req, res, next) {
    const { name, categories } = req.body;
    try {
        if (!name) {
            throw new Error("导航名称不能为空!");
        }
        if (!categories) {
            throw new Error("categories字段不存在");
        }
    } catch (e) {
        return res.send(Body({
            code: 'validate',
            msg: e.message
        }));
    }
    // 设置导航
    try {
        categories = categories.split(",");
        categories = categories.map(function (item) {
            return { name: item }
        });
    } catch (e) {
        return res.send(Body({
            code: 'accident',
            msg: '分类出现错误, 请检查格式'
        }));
    }
    new Nav({ name, categories }).save((err, nav) => {
        if (err) {
           return res.send(Body({
              code: 'unknown',
              msg: '添加失败'
            }));
        } 
        return res.send(Body(nav));
    });
}

// 更新导航
exports.updateNav = function(req, res , next) {
     var body = req.body;
     var navId = body.navId;
     var name = body.name;
     try {
        if (!navId) {
            throw new Error("缺少导航Id");
        } 
        if (!name.replace(/\s/g, "")) {
             throw new Error("导航名称不能");
        }
     } catch (e) {
        return res.send(Body({
             code:'validate',
             msg: e.message
        }));
     }

     NavModel.updateNav({_id: navId}, {$set: {name}}, function(err, doc) {
         if (err) {
             return res.send({
                 code: 'unknown'
             });
         } 
         // ok
         return res.send(doc)
     })
}

// 更新分类名称
exports.updateCategoies = function(req, res, next) {
    var body = req.body;
    var navId = body.navId;
    var categoryId = body.categoryId;
    var name = body.name;
    try {
        if (!navId) {
            throw new Error('导航Id不能为空');
        }
        if (!name) {
            throw new Error('导航名称不能为空');
        }
    } catch(e) {
        return res.send(Body({
            code: 'validate',
            msg: e.message
        }));
    }
   
    NavModel.update({
        _id: navId,
        'categories._id': categoryId
    }, {
        $set : {"categories.$.name": name }
    }, function(err, doc) {
        if (err) {
            return res.send(Body({
                code: 'unknown'
            }));
        }

        return res.send(Body(doc));
    });
}
