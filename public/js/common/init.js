define([
    'require',
], function(require) {
     return {
         grid: function(dataSource, columns) {
            var element = $("#grid");
            if (element.data("kendoGrid")) {
                element.data("kendoGrid").destroy();
                element.empty();
            }
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
            dataSource = {
                 ...dataSource,
                 serverPaging: true,
                 serverFiltering: true,
                 serverSorting: true,
                 pageSize: 10,
            }
            var grid = element.kendoGrid({
                dataSource: new kendo.data.DataSource(dataSource),
                height: gridHeight,
                scrollable: true,
                resizable: true,
                sortable: true,
                filterable: true,
                refresh: true, 
                editable: 'inline',  
                pageable: {
                    input: true,
                    numeric: false,
                    refresh: true,
                },
                columns: columns,
                columnMenu: true
            });
            return grid;
         },
         window: function(el, title, width) {
             if (el.data('kendoWindow')) {
                return el.data("kendoWindow").center().open();   
             }
             el.kendoWindow({
                    width: width || "400px",
                    title: title ||　"form",
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