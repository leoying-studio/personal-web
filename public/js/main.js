require.config({
     paths: {
         "jquery": "../lib/jquery/jquery.min",
         "kendo": "../lib/kendo/kendo.all.min",
         "manager": "./manager",
     },
     shim: {
         "kendo": {
             deps: [
                "jquery",
                "css!./../lib/kendo/styles/kendo.common.min.css",
                "css!./../lib/kendo/styles/kendo.dataviz.default.min.css",
                "css!./../lib/kendo/styles/kendo.dataviz.min.css",
                "css!./../lib/kendo/styles/kendo.default.min.css",
                "css!./../lib/kendo/styles/kendo.rtl.min.css",
                "css!./../lib/kendo/styles/kendo.default.mobile.min.css"
            ]
         },
         "manager": {
            deps: [
                "kendo",
                "css!./../css/reset.css",
                "css!./../css/common.css",
                "css!./../css/manager.css",
            ]
         }
        
     },
     map: {
        '*': {
            css: '../lib/require/css.min.js'
        }
    }
});

require(["kendo", "manager"], function(util) {
    // todo
});

    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.common.min.css')
    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.dataviz.default.min.css')
    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.dataviz.min.css')
    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.default.min.css')
    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.rtl.min.css')
    // link(rel='stylesheet', href='/lib/kendo/styles/kendo.default.mobile.min.css')