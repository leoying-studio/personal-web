exports.abnormal = function(err, req, res, next) {
    res.render("common/error");
}   

exports.message = {
    success: function(req, res, next) {
        var body = req.body;
        var message = body.message;
        var data = body.data;
        if (data) {
            return res.send({
                status: true,
                data: data || null,
                message: message || '保存成功!'
            });
        }
        next();
    },
    error: function(req, res, next) {
        var body = req.body;
        var message = body.message;
        res.send({
            status: false,
            message: message || '数据执行异常!'
        });
    }
}