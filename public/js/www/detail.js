define([
    'require',
    'jquery',
    'invok'
], function(require, $, invok) {
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
                    window.location.href = window.location.origin+"/articles/detail/view/"+articleId+"/"+no;
                }
                inited = true;
            }
        });
     }

    var appendComment = function(comment) {
         commentSection.prepend(
             "<article class='comment-content-item'>"
                +
                    "<h2 class='user'>"+comment.username+"<span class='publish-time'>刚刚</span>"+"</h2>"
                                + 
                        "<p class='content'>"+ comment.content +"</p>"
                +
             "</article>"
         );
    }

    var publishBtn = $("#publishBtn");
    //  //发表文章详情页的评论
    publishBtn.click(function () {
        var content = $("#textareaContent").val();
            $.ajax({
                url: "/articles/comment/add",
                type: 'post',
                data: {
                    content: content,
                    username: '暂无',
                    articleId: $(this).attr("articleId")
                },
                success: function (res) {
                    if (res.status) {
                        api.message.success("发布成功");
                        $("#textareaContent").val("")
                    }
                    api.message.error("发布失败");
                },
                fail: function () {

                }
            });
        });
     $("#articleContent").html($("#articleContent").text());
});