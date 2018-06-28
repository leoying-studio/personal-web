define([
    'require',
    'jquery',
    'api',
    'aside'
], function(require, $, api, aside) {
    var main = $('#main'), asideBar = $('.aside-bar');
    var breadcrumb = main.find('.breadcrumb');
    var toolbar = $('#toolbar');
    var dropdowm = toolbar.find('.dropdown-menu');
    var dropdownActive = toolbar.find('.dropdown-menu-active');
    var buttons= toolbar.find('button');
    var addbutton = buttons.eq(0);
    aside.switchToTheme(function() {
        buttons.show();
        api.removeAllBread();
        api.insertBread('主题列表', 'themeMap', {});
        getThemeCategories();
    });

    // 获取主题分类
    var getThemeCategories = function() {
        $.get('/intro/themes/data').then(function(data) {
            dropdowm.children().remove();
            $(data).each(function(index, item) {
                dropdowm.append('<li><a>'+item.headline+'</a></li>');
            });
            if (data.length) {
                var firstCateory = data[0];
                dropdownActive.text(firstCateory.headline);
                getCategoryTheme(firstCateory);
            }
        });
    }

    var getCategoryTheme = function(category) {
        $.get('/intro/themes/map/data', {
            _id: category._id
        }).then(function(res) {
            debugger;
        });
    }
});