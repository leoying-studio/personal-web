
// 查询
exports.find = function(condtion) {
   var model = condtion.model;
   var params = condtion.params || {};
   var pageSize = condtion.pageSize || 20;
   var currentPage = condtion.currentPage || 1;
   try {
        return model.find(params).sort({'serverTime': 1}).skip(currentPage).limit(pageSize).exec();
   }catch(e) {
      console.log('error');
   }
}

exports.findAll = function(model) {
    return model.find({}).exec();
}

exports.findOne = function(condtion) {
    var params = condtion.params;
    var model = condtion.model;
    try {
        return model.findOne(params).exec();
    }catch(e) {
        console.log('error');
    }
}

//  新增
exports.save = function(schema) {
    try{
        return schema.save().exec();
    }catch(e) {
        console.log('error');
    }
}

