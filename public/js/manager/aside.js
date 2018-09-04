define([
    'require',
    'jquery',
    'api'
], function(require, $, api) {
    // 左侧模块主要负责点击事件
    var homeMenu = $('.aside-bar > ul > li:eq(0) > ul > li');
    var categoriesMenu = $('.aside-bar > ul > li:eq(1) > ul > li');
    var articlesMenu = $('.aside-bar > ul > li:eq(2) > ul > li' );

    homeMenu.click(function(e) {
        homeMenu.find('.active').removeClass('active');
        $(this).find('span').addClass('active');
    });

    categoriesMenu.click(function() {
        categoriesMenu.find('.active').removeClass('active');
        $(this).find('span').addClass('active');
    });

    articlesMenu.click(function() {
        categoriesMenu.find('.active').removeClass('active');
        $(this).find('span').addClass('active');
    });
});