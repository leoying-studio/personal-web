require.config({
    paths: {
        'jquery': '/lib/jquery/jquery.min',
        'bootstrap': '/lib/bootstrap/js/bootstrap.min',
        'intro': '/js/manager/home/intro',
        'api': '/js/common/api',
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

require(['bootstrap'], function() {
   require(['api', 'intro'], function() {
       
   });
});



