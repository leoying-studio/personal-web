require.config({
    paths: {
        'jquery': '/lib/jquery/jquery.min',
        'bootstrap': '/lib/bootstrap/js/bootstrap.min',
        'bootstrap.table': '/lib/bootstrap/js/bootstrap.table',
        'config': '/js/common/config',
        'api': '/js/common/api',
        'articles': '/js/manager/articles/index',
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

require(['bootstrap', 'bootstrap.table'], function() {
   require(['config', 'api', 'articles'], function() {
       
   });
});



