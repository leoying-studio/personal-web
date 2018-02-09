require.config({
     paths: {
         "manager": "./manager/index",
         "home": "manager/home",
         "config": "./manager/config",
         "init": "./common/init",
         "utils": "./common/utils",
     },
     shim: {
         "manager": {
            deps: [
                "css!./../css/reset.css",
                "css!./../css/common.css",
                "css!./../css/manager.css",
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
    if ($("#errorNotification").length > 0) {
        var notification = init.notification('error');
        notification.show({
            title: $("#errorNotification").attr("message"),
            message: "发生错误了"
        }, "error");
    } else if ($("#successNotification").length > 0) {
        var notification = init.notification('success');
        notification.show({
            title: $("#successNotification").attr("message"),
            message: "已完成此操作"
        }, "success");
    }
});
