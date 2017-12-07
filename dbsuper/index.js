
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
    var fields = condtion.fields;
    var model = condtion.model;
    try {
        return model.findOne(fields).exec();
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

