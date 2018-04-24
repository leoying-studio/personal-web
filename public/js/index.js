$(document).ready(function() {

     // 返回到首页   
     $("#homePage").click(function() {
        window.location.href = location.origin;
     });

     // 分类选择
    //  $('.category-menu').click(function() {
    //      var navId = $(this).attr('navid');
    //      var categoryId = $(this).attr('categoryId');
    //      window.location.href=window.location.origin+"/article/view/"+navId+"/"+categoryId+"/1";
    //  });

     // banner 轮播
     $('.banner-item :not(:first)').hide();
     var bannerIndex = 0;
     setInterval(function() {
         bannerIndex+= 1;
         if (bannerIndex >= $('.banner-item').length) {
             bannerIndex = 0;
         }
         $(".banner-item").eq(bannerIndex).fadeIn(800).siblings().fadeOut(800);
     }, 3000);
     

     var inited = false;
     // 分页初始化
     var articlePaging = $("#articlePaging");
     if (articlePaging[0]) {
        var currentPage = articlePaging.attr('currentPage');
        var navId = articlePaging.attr("navId");
        var categoryId = articlePaging.attr("categoryId");
        var total = articlePaging.attr("total");
        articlePaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(pageNo) { // 回调函数 
                if (inited) {
                    window.location.href=window.location.origin+"/article/view/"+navId+"/"+categoryId+"/"+pageNo;
                }
                inited = true;
            }
        });
     }

    //  // 评论页面分页初始化
     var commentPaging = $("#commentPaging");
     if (commentPaging[0]) {
        var total = commentPaging.attr("total");
        // var navId = commentPaging.attr("navId");
        // var categoryId =commentPaging.attr("categoryId");
        var articleId = commentPaging.attr("articleId");
        var currentPage = commentPaging.attr("currentPage");
        commentPaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(no) { // 回调函数 
                if (inited)
                window.location.href = window.location.origin+"/article/article/view/"+articleId+"/"+no;
                inited = true;
            }
        });
     }

    //  //发表文章详情页的评论
     $("#publishCommentBtn").click(function() {
         var detailId = $(this).attr('detailId');
        $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){ 
              var country = remote_ip_info["country"];
              var province = remote_ip_info["province"];  
              var city = remote_ip_info["city"];    
              var username = province+city+"用户说:"
              var content = $("#commentContent").val();
              var params = {
                  username, 
                  content,
                  detailId
              };
              $.ajax({
                 url: '/article/article_detail/submit_comment',
                 data: params,
                 type:'post',
                 success: function(data) {
                    if (data.code == 200) {
                        alert("提交成功");
                        window.history.go(0);
                    }else {
                        alert("提交失败");
                    }
                 },
                 error: function() {
                     alert("提交失败");
                 }
              });
         }) ;   
     });



    // 进入文章详情页面
    // $(".article-verticle-item").click(function() {
    //     debugger;
    //     var navId = $(this).attr("navId");
    //     var categoryId = $(this).attr("categoryId");
    //     var articleId = $(this).attr("articleId");
    //      window.location.href=window.location.origin+"/article/article/view/"+articleId+"/1";
    // });
     
    $("#articleContent").html($("#articleContent").text());
    $("#articleContent").html($("#articleContent").text());

});
