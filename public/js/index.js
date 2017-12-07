function backHome() {
    window.location.href = "http://localhost:3000";
}

$(document).ready(function() {
     $('.nav-name').click(function() {
         debugger;
         var navId = $(this).attr('navid');
         var categories = $(this).attr('categories');
         var category = JSON.parse(categories)[0]._id;
         window.location.href=window.location.origin+"/article/view/"+navId+"/"+category
     });
     $("#paging").paging({
        initPageNo: 1, // 初始页码
        totalPages: 30, //总页数
        totalCount: '合计300条数据', // 条目总数
        slideSpeed: 600, // 缓动速度。单位毫秒 
        callback: function(page) { // 回调函数 
            console.log(page);
        }
     })
});
