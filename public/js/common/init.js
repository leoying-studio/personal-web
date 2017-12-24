define([
    'require',
], function(require) {
     return {
         grid: function(dataSource, columns, onPaging) {
            $("#grid").html("");
            var rightHeight = $(".right-wrapper").eq(0).height();
            var headerHeight = $(".right-header").eq(0).height();
            var gridHeight = rightHeight - headerHeight - 2 + "px";
            // var coustomColumns = [{
            //     title: "选择",  //checkbox  
            //     width: 80,  
            //     field: "selector",
            //     template: "<input value='#= _id #' type='checkbox' />",  
            //     filterable: false  
            // }, ...columns];
            var grid = $("#grid").kendoGrid({
                dataSource: dataSource,
                height: gridHeight,
                scrollable: true,
                resizable: true,
                sortable: true,
                filterable: true,
                pageable: {
                    input: true,
                    numeric: false,
                    refresh: true,
                    pageSize: 10,
                    buttonCount: 5
                },
                columns: columns,
                editable: false,
                columnMenu: true,
                page: onPaging
            });
            return grid;
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