require.config({
     paths: {
         'request': "./common/request",
         'jquery': '/lib/jquery/jquery.min',
         'bootstrap': '/lib/bootstrap/js/bootstrap.min',
         'bootstrap.table': '/lib/bootstrap/js/bootstrap.table',
         'bootstrap-table-zh-CN': '/lib/bootstrap/js/bootstrap-table-zh-CN.min',
         'home': '/js/manager/home'
     },
     shim: {
          'bootstrap': {
              deps: ['jquery'],
          },
          'bootstrap-table-zh-CN': {
              deps: ['jquery']
          },
          'bootstrap.table': {
              deps: ['jquery']
          }
     },
     map: {
         
    }
});

require(['bootstrap', 'bootstrap.table', 'bootstrap-table-zh-CN',], function() {
    require(['home'], function() {
        
    })
});



