require.config({
     paths: {
         "manager": "./manager/index",
         "home": "manager/home",
         "config": "./common/config",
         "init": "./common/init",
         'invok': './common/invok',
         "utils": "./common/utils",
         'request': "./common/request",
        //  'jquery': '/lib/jquery/jquery.min',
        //  'jquery.kendo.panelbar': '/lib/kendo/kendo.panelbar.min',
        //  'jquer.kendo.grid': '/lib/kendo/kendo.grid.min',
        //  'jquer.kendo.tabstrip': '/lib/kendo/kendo.tabstrip.min',
     },
     shim: {
         "manager": {
            deps: [
                "css!./../css/reset.css",
                "css!./../css/common.css",
                "css!./../css/manager.css",
                "css!./../lib/font-awesome-4.7.0/css/font-awesome.min.css"
            ],
        //   "jquery": {
        //       deps: [
        //           "css!/lib/kendo/styles/kendo.bootstrap.min.css",
        //           "css!/lib/kendo/styles/kendo.common.min.css"
        //       ]
        //   },
        //   'jquery.kendo.panelbar': {
        //         deps: ['jquery']
        //   },
        //   'jquery.kendo.grid': {
        //         deps: ['jquery']
        //    },
        //    'jquery.kendo.tabstrip': {
        //         deps: ['jquery']
        //     }

         }
     },
     map: {
        '*': {
            css: '../lib/require/css.min.js'
        }
    }
});


require(["manager", "home",], function(manager, home, init) {
    $("#tabStrip").kendoTabStrip({
        animation:  {
            open: {
                effects: "fadeIn"
            }
        }
    });
});    

