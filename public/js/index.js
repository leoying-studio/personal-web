$(document).ready(function() {
    var bannerItem = $("#bannerPanel").find(".banner-item");
    var header = $("#header");
    var nav = header.children("nav:eq(0)");
    var homeFont = nav.find(".nav-item:eq(0) > a");
    var homeIcon = header.find('h1:eq(0)');
    var timelineView = $(".timeline:eq(0)");
    var lines = timelineView.find(".line");
    var contentViews = timelineView.find(".content");
    var commentSection = $(".article-detail-wrapper:eq(0)").find(".comment-content:eq(0)"); 
    var lineIndex = 0;
    var previousTop = 0;
    var bannerIndex = 0;
     // banner 轮播
     bannerItem.not(":first").hide();
     setInterval(function() {
         if (bannerIndex >= $('.banner-item').length) {
             bannerIndex = 0;
         }
         $(".banner-item").eq(bannerIndex).fadeIn(200).siblings().fadeOut(300);
         bannerIndex+= 1;
     }, 3000);

      // 返回到首页   
     $([homeFont, homeIcon]).each(function(index, item) {
         $(item).click(function() {
            window.location.href = location.origin;
         });
     });

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

    if (timelineView.length) {
        $(window).scroll(function(event) {
            var top = $(window).scrollTop();
            var lineTop = timelineView[0].offsetTop;
            var height = timelineView.find(".line:eq(0)").height();
            if (top >=　lineTop) {
                if (lineIndex <= lines.length - 1 &&　top - previousTop >= height) {
                    previousTop = top;
                    if (lineIndex % 2 === 0) {
                        // 单数
                        contentViews.eq(lineIndex).addClass("content-left");
                    } else {
                        contentViews.eq(lineIndex).addClass("content-right");
                    }
                    lines.eq(lineIndex).addClass("line-progress");
                    lineIndex += 1
                }
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
                window.location.href = window.location.origin+"/article/detail/view/"+articleId+"/"+no;
                inited = true;
            }
        });
     }

    var appendComment = function(comment) {
         commentSection.append(
             "<article class='comment-content-item'>"
                +
                    "<h2 class='user'>"+comment.user+"<span>"+48+"分钟前</span>"+"</h2>"
                                + 
                        "<p class='content'>"+ comment.content +"</p>"
                +
             "</article>"
         );
    }

    //  //发表文章详情页的评论
     $("#publishCommentBtn").click(function() {
         var articleId = $(this).attr('articleId');
        $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){ 
              var country = remote_ip_info["country"];
              var province = remote_ip_info["province"];  
              var city = remote_ip_info["city"];    
              var username = province+city+"用户说:"
              var content = $("#commentContent").val();
              var params = {
                  username, 
                  content,
                  articleId
              };
  
              $.ajax({
                 url: '/article/comment/submit',
                 data: params,
                 type:'post',
                 success: function(res) {
                   if (res.status) {
                       appendComment(res.data);
                       alert("评论成功");
                   } else {
                       alert(res.msg);
                   }
                 },
                 error: function() {
                     alert("提交失败");
                 }
              });
         }) ;   
     });

   
     
    $("#articleContent").html($("#articleContent").text());

});
