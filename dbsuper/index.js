
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
        .limit(pageSize);
   }catch(e) {
      console.log('error');
   }
}

exports.findAll = function(model) {
    return model.find({}).exec();
}

exports.findOne = function(params) {
    var conditions = params.conditions;
    var model = params.model;
    try {
        return model.findOne(conditions).exec();
    }catch(e) {
        console.log('error');
    }
}

//  新增
exports.save = function(model) {
    try{
        return model.save();
    }catch(e) {
        console.log(e);
    }
}

