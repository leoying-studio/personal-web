define([
    'require',
    'jquery',
    'api'
], function(require, $) {
    var homeMenu = $('.aside-bar > ul > li:eq(0) > ul > li');
    var toolbar = $('#toolbar');
    var buttons = toolbar.find('button');
    homeMenu.click(function(e) {
        var index = $(this).index();
        switch(index) {
            case 0:
                switchToIntro();
            break;
            case 1: 
                switchToTheme();
            break;
        }
    });

    var switchToTheme = function() {
        buttons.show();
    }

    var switchToIntro = function() {
        buttons.not(':first-child').hide();
    }
});