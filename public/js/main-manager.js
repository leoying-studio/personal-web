require.config({
     paths: {
         "manager": "/js/manager/index",
         "home": "manager/home",
         "config": "./common/config",
         "init": "./common/init",
         'invok': './common/invok',
         "utils": "./common/utils",
         'request': "./common/request",
         'jquery': '/lib/jquery/jquery.min',
     },
     shim: {
          'kendo.all.min': {
              deps: ['jquery'],
          }
     },
     map: {
         
    }
});


require(['kendo.all.min'], function() {
    require(["manager", "home"], function(manager, home) {
       
    });        
});



