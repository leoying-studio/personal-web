define([
    'require',
    'jquery',
    'api'
], function(require, $, api) {
    // 左侧模块主要负责点击事件
    var homeMenu = $('.aside-bar > ul > li:eq(0) > ul > li');
    var toolbar = $('#toolbar');
    var buttons = toolbar.find('button');
    // 业务回调
    var themeCallback = null;
    var introCallback = null;

    homeMenu.click(function(e) {
        homeMenu.find('.active').removeClass('active');
        $(this).find('span').addClass('active');
        var index = $(this).index();
        switch(index) {
            case 0:
                introCallback();
            break;
            case 1: 
                themeCallback();
            break;
        }
    });

    var switchToTheme = function(cb) {
        themeCallback = cb;
    }

    var switchToIntro = function(cb) {
        introCallback = cb;
    }

    return {
        'switchToTheme': switchToTheme,
        'switchToIntro': switchToIntro
    };
});