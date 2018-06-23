require.config({
     paths: {
         'jquery': '/lib/jquery/jquery.min',
         'bootstrap': '/lib/bootstrap/js/bootstrap.min',
         'bootstrap.table': '/lib/bootstrap/js/bootstrap.table',
         'bootstrap-table-zh-CN': '/lib/bootstrap/js/bootstrap-table-zh-CN.min',
         'intro': '/js/manager/home/intro',
         'aside': '/js/manager/home/aside',
         'api': '/js/common/api',
         'config': '/js/common/config'
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
    require(['config', 'api','intro', 'aside'], function() {
        
    })
});



