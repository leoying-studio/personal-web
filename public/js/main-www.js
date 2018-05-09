require.config({
    baseUrl: "/js/www/",
    paths: {
        "index": "index",
        "article": "article",
        "detail": "detail",
        "jquery": "./../../lib/jquery/jquery.min",
        "jquery.flexslider": "./../../lib/jquery/plugin/jquery.flexslider",
        "jquery.paging": "./../../lib/jquery/plugin/paging/paging.min"
    },
    shim: {
        "index": {
            deps: [
                "css!./../../css/index.css",
            ]
        }, 
        "jquery.flexslider": ['jquery'],
        "jquery.paging": ['jquery'],
        "article": {
            deps: [
                "css!/css/article.css",
            ]
        },
        "*": {
            deps: [
                "css!./../../css/common.css",
            ]
        }
    },
    map: {
        '*': {
            css: './../../lib/require/css.min.js'
        }
    }
});


require(["jquery","jquery.flexslider","jquery.paging","index", "article", "detail"], function($) {

});

