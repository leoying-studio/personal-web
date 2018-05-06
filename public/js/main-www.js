require.config({
    baseUrl: "/js/www/",
    paths: {
        "index": "index",
        "article": "article",
        "detail": "detail"
    },
    shim: {
        "index": {
            deps: [
                "css!./../../css/index.css",
            ]
        }, 
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
            css: './../lib/require/css.min.js'
        }
    }
});


require(["index", "article", "detail"], function() {

});