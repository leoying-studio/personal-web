require.config({
     paths: {
         "manager": "./manager/index",
         "home": "manager/home",
         "config": "./common/config",
         "init": "./common/init",
         'invok': './common/invok',
         "utils": "./common/utils",
         'request': "./common/request"
     },
     shim: {
         "manager": {
            deps: [
                "css!./../css/reset.css",
                "css!./../css/common.css",
                "css!./../css/manager.css",
                "css!./../lib/font-awesome-4.7.0/css/font-awesome.min.css"
            ],
         }
     },
     map: {
        '*': {
            css: '../lib/require/css.min.js'
        }
    }
});

require(["manager", "home", "init"], function(manager, home, init) {
    $("#tabStrip").kendoTabStrip({
        animation:  {
            open: {
                effects: "fadeIn"
            }
        }
    });
});
