define([
    'require',
], function(require) {
     return {
         grid: function(dataSource, columns) {
            $("#grid").html("");
            var rightHeight = $(".right-wrapper").eq(0).height();
            var headerHeight = $(".right-header").eq(0).height();
            var gridHeight = rightHeight - headerHeight - 2 + "px";
            $("#grid").kendoGrid({
                dataSource: {
                    data: dataSource,
                    pageSize: 50
                },
                height: gridHeight,
                scrollable: true,
                sortable: true,
                filterable: true,
                pageable: {
                    input: true,
                    numeric: false
                },
                columns: columns,
                editable: false
            });
         },
         window: function(el, title, width) {
             el.kendoWindow({
                    width: width || "400px",
                    title: title ||　"添加",
                    visible: false,
                    actions: [
                        "Pin",
                        "Minimize",
                        "Maximize",
                        "Close"
                    ]
            }).data("kendoWindow").center().open();   
         }
     };
});