require.config({
    baseUrl: "/",
    　paths: {
        "easing":"lib/easing"
　　　}
})

require(['easing'], function (easing){
    // var sliderInner = document.getElementById('banners');
    // var els = document.getElementsByClassName('banner-item');
    // var start = 0;
    // var begin  = 0;
    // var during = 100;
    // function sild() {
    //     window.requestAnimationFrame(function() {
    //         var elWidth = window.innerWidth;
    //         var offsetEnd = Math.abs(elWidth) * (els.length - 3)
    //         var left = easing.Cubic.easeInOut(start, begin, elWidth, during);
    //         // 位移
    //         sliderInner.style.transform = 'translateX(' + -left + 'px)';
    //         start++;
    //         // 如果还没有运动到位，继续
    //         if (start <= during) {
    //             requestAnimationFrame(sild);
    //         } else {
    //             if (begin === offsetEnd) {
    //                 // 动画结束，这里可以插入回调...
    //                 begin = 0;

    //             } else{
    //                 let no = (begin / elWidth) + 1
    //                 begin = (no) * elWidth;
    //             }
    //             start = 0
    //             setTimeout(() => {
    //                 requestAnimationFrame(sild);
    //             }, 3000)
    //         }
    //     })
    // }
    // sild();
 });