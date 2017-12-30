exports.regFind = function () {
    arguments[0].statics.findPaging = function (params = {}, conditions = {}) {
        var currentPage = params.currentPage || 1;
        var pageSize = params.pageSize || 10;
        return schema.find(conditions).sort({ 'serverTime': 1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize).lean();
    }
}

exports.findAll = function(model) {
    return model.find({}).lean();
}

exports.findOne = function(params) {
    var conditions = params.conditions;
    var model = params.model;
    try {
        return model.findOne(conditions).lean();
    }catch(e) {
        console.log('error');
    }
}

//  新增
exports.save = function(model) {
    try{
        return model.save().lean();
    }catch(e) {
        console.log(e);
    }
}
