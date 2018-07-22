require.config({
     paths: {
         'jquery': '/lib/jquery/jquery.min',
         'bootstrap': '/lib/bootstrap/js/bootstrap.min',
         'bootstrap.table': '/lib/bootstrap/js/bootstrap.table',
         'bootstrap-table-zh-CN': '/lib/bootstrap/js/bootstrap-table-zh-CN.min',
         'intro': '/js/manager/home/intro',
         'aside': '/js/manager/common/aside',
         'api': '/js/common/api',
         'config': '/js/common/config',
         'theme': '/js/manager/home/theme',
         'categories': '/js/manager/categories/index',
         'subCategories': '/js/manager/categories/subCategories',
         'articles': '/js/manager/articles/index',
         'comments': 'js/manager/articles/comments'
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
    require(['config', 'api','aside', 'intro', 'theme', 'categories', 'subCategories', 'articles', 'comments'], function() {
        
    });
});



