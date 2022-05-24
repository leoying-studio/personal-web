
// 作为中间件可以对返回的数据格式进行定义
exports.message = {
    success: function(req, res, next) {
        var body = req.body;
        var message = body.message;
        var data = body.data;
        if (data) {
            var main = {};
            for(var key in data) {
                main[key] = data[key];
            }

            return res.send({
                status: true,
                main: main,
                message: message || '保存成功!'
            });
        }
        next();
    },
    error: function(req, res, next) {
        var body = req.body;
        var message = body.message;
        res.render("layout", {});
    }
}

exports.abnormal = function(err, req, res, next) {
    // return res.render("common/error");
}   
