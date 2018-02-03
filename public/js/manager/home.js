define([
    'require',
], function(require) {
     $("#nav-add-banner").click(function () {
        $("#bannerForm").kendoWindow({
            width: "500px",
            title: "添加首页轮播项",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ]
        }).data("kendoWindow").center().open();
     });
     
});