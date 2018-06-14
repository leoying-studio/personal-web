require.config({
     paths: {
         'request': "./common/request",
         'jquery': '/lib/jquery/jquery.min',
         'bootstrap': '/lib/bootstrap/js/bootstrap.min'
     },
     shim: {
          'bootstrap': {
              deps: ['jquery'],
          }
     },
     map: {
         
    }
});

require(['bootstrap'], function() {
    
});



