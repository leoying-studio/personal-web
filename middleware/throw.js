exports.abnormal = function(req, res, next) {
    res.send({
        status: false,
        message: "出现异常"
    });
}