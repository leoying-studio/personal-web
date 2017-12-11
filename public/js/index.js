$(document).ready(function() {
     //全局参数
     var data = $("#params-station").val();
     var params = JSON.parse(data).params;
     var navId = null;
     var categoryId = null;
     var currentPage =null;
     var total = 0
     var inited = false;

     if (params) {
         navId = params.navId;
         categoryId = params.categoryId;
         currentPage = params.currentPage;
         total = JSON.parse(data).total;
     }

     // 返回到首页   
     $("#homePage").click(function() {
        window.location.href = "http://localhost:3000";
     });

     // 分类选择
     $('.category-menu').click(function() {
         var navId = $(this).attr('navid');
         var categoryId = $(this).attr('categoryId');
         window.location.href=window.location.origin+"/article/view/"+navId+"/"+categoryId+"/1"
     });
     
     // 分页初始化
     var paging = $("#paging");
     if (paging[0]) {
          paging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 20), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(pageNo) { // 回调函数 
                if (inited)
                window.location.href=window.location.origin+"/article/view/"+navId+"/"+categoryId+"/"+pageNo
                inited = true;
            }
        });
     }
   

    // 进入文章详情页面
    $(".article-verticle-item").click(function() {
        var navId = $(this).attr("navId");
        var categoryId = $(this).attr("categoryId");
        var articleId = $(this).attr("articleId");
         window.location.href=window.location.origin+"/article/article_detail/view/"+navId+"/"+categoryId+"/"+articleId;
    });
     
    var aricleContent = $("#articleContent").text();
    $("#articleContent").html(aricleContent);
    var aricleContent = $("#articleContent").text();
    $("#articleContent").html(aricleContent);

});
