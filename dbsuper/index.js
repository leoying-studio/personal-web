// 查询
exports.find = function(params) {
   var model = params.model;
   var conditions = params.conditions || {};
   var pageSize = params.pageSize || 10;
   var currentPage = params.currentPage || 1;
   try {
        return model.find(conditions)
        .sort({'serverTime': 1})
        .skip((currentPage - 1) * pageSize )
        .limit(pageSize).lean();
   }catch(e) {
      console.error('error');
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
