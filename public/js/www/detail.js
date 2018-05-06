define([
    'require',
], function(require) {
    var commentSection = $(".article-detail-wrapper:eq(0)").find(".comment-content:eq(0)"); 
    var inited = false;
     //  // 评论页面分页初始化
     var commentPaging = $("#commentPaging");
     if (commentPaging.length) {
        var total = commentPaging.attr("total");
        var articleId = commentPaging.attr("articleId");
        var currentPage = commentPaging.attr("currentPage");
        commentPaging.paging({
            initPageNo: currentPage, // 初始页码
            totalPages: Math.ceil(total / 10), //总页数
            totalCount: '共'+total+'条', // 条目总数
            slideSpeed: 600, // 缓动速度。单位毫秒 
            callback: function(no) { // 回调函数 
                if (inited) {
                    window.location.href = window.location.origin+"/article/detail/view/"+articleId+"/"+no;
                }
                inited = true;
            }
        });
     }

    var appendComment = function(comment) {
         commentSection.prepend(
             "<article class='comment-content-item'>"
                +
                    "<h2 class='user'>"+comment.username+"<span>"+48+"分钟前</span>"+"</h2>"
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