define([
    'require',
    'jquery',
    'api'
], function (require, $, api) {
    var inited = false;
    // 分页初始化
    var articlePaging = $("#articlePaging");
    if (articlePaging.length) {
        var currentPage = articlePaging.attr('currentPage');
        var navId = articlePaging.attr("navId");
        var categoryId = articlePaging.attr("categoryId");
        var total = articlePaging.attr("total");
        articlePaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共' + total + '条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function (pageNo) { // 回调函数 
                if (inited) {
                    window.location.href = window.location.origin + "/articles/view/" + navId + "/" + categoryId + "/" + pageNo;
                }
                inited = true;
            }
        });
    }
});