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
    if (!params) {
        return IntroModels.find(fields)
    }
    var pageSize = params.pageSize;
    var pagination = params.pagination;
    var start = (pagination - 1) * pageSize;
    var end = pagination * pageSize;
    return IntroModels.find(fields).populate("map", { slice: [start, end] });
}

/**
 * @param {String} introId 当前新添加的introId
 */
exports.applyIntro = function (introId) {
    return new Promise(function (resolve, reject) {
        IntrosModel.count(function(sum) {
            if (!sum) {
                return resolve(sum);
            }
            IntrosModel.update({ apply: true }, { $set: { apply: false } }, function (err, state) {
                if (err) {
                    reject(err);
                }
                if (state.n > 0) {
                    // 引用当前介绍信息
                    IntrosModel.update({ _id: introId }, { $set: { apply: true } }, function (err, state) {
                        if (err) {
                           return reject(err);
                        }
                        if (state.n === 0) {
                            return reject({
                                status: false,
                                message: "数据更新失败"
                            });
                        }
                        resolve({
                            status: true,
                            message: "应用该介绍信息成功"
                        });
                    }).catch(next)
                } else {
                    reject({
                        status: false,
                        message: '更新失败'
                    });
                }
            });
        });
    });
}