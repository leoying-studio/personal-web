require.config({
    paths: {
        'jquery': '/lib/jquery/jquery.min',
        'bootstrap': '/lib/bootstrap/js/bootstrap.min',
        'bootstrap.table': '/lib/bootstrap/js/bootstrap.table',
        'ue.config': '/lib/ue/ueditor.config',
        'ue.editor': '/lib/ue/ueditor.all.min',
        'ue.lang': '/lib/ue/lang/zh-cn/zh-cn',
        'config': '/js/common/config',
        'api': '/js/common/api',
        'articles': '/js/manager/articles',
        "ZeroClipboard": "/lib/ue/third-party/zeroclipboard/ZeroClipboard.min"
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
         },
    },
    map: {
        
   }
});


require(['ZeroClipboard'], function (ZeroClipboard) {
    window['ZeroClipboard'] = ZeroClipboard;
    require(['bootstrap', 'bootstrap.table',"ue.config", "ue.editor"], function() {
        require(['config', 'api', 'articles', "ue.lang" ], function() {
            
        });
     });
});





