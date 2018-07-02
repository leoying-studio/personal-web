var IntrosModel = require("./../models/intros");

// 获取介绍信息
exports.getIntros = function (params) {
    if (params) {
        return IntrosModel.queryPaging(params);
    } else {
        return IntrosModel.findOne({ apply: true }); 
    }
}

/**
 * @param {*} fields 
 * @param {*} params 
 */
exports.getThemeMap = function (fields, params) {

}
