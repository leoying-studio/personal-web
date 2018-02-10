require.config({
     paths: {
         "manager": "./manager/index",
         "config": "./manager/config",
         "init": "./common/init",
         "utils": "./common/utils",
         "navs": "./manager/navs"
     },
     shim: {
         "manager": {
            deps: [
                "css!./../css/reset.css",
                "css!./../css/common.css",
                "css!./../css/manager.css",
            ],
         }
     },
     map: {
        '*': {
            css: '../lib/require/css.min.js'
        }
    }
});


require(["./manager/navs"], function () {
   
});
