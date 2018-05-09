define([
    'require',
    'jquery'
], function(require, $) {
    var bannerItem = $("#bannerPanel").find(".banner-item");
    var header = $("#header");
    var nav = header.children("nav:eq(0)");
    var homeFont = nav.find(".nav-item:eq(0) > a");
    var homeIcon = header.find('h1:eq(0)');
    var timelineView = $(".timeline:eq(0)");
    var lines = timelineView.find(".line");
    var contentViews = timelineView.find(".content");
  
    var lineIndex = 0;
    var previousTop = 0;
    var bannerIndex = 0;
     // banner 轮播
    //  bannerItem.not(":first").hide();
    //  setInterval(function() {
    //      if (bannerIndex >= $('.banner-item').length) {
    //          bannerIndex = 0;
    //      }
    //      $(".banner-item").eq(bannerIndex).fadeIn(200).siblings().fadeOut(300);
    //      bannerIndex+= 1;
    //  }, 3000);

    //  $(".flexslider").hide();
     $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false
    });
      // 返回到首页   
     $([homeFont, homeIcon]).each(function(index, item) {
         $(item).click(function() {
            window.location.href = location.origin;
         });
     });

     

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
    
});
