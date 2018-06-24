define([
    'require',
    'jquery',
    'api',
    'aside'
], function(require, $, api, aside) {
    var main = $('#main'), asideBar = $('.aside-bar');
    var breadcrumb = main.find('.breadcrumb');
    var toolbar = $('#toolbar');
    var buttons= toolbar.find('button');
    var addbutton = buttons.eq(0);
    aside.switchToTheme(function() {
        buttons.show();
        api.removeAllBread();
        api.insertBread('主题列表', 'themeMap', {});
    });

    // 获取主题分类
    var getThemeCategories = function() {
        $.get('/')
    }
});