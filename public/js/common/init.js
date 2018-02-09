

define([
    'require',
], function(require) {
     function grid(dataSource, columns) {
        var grid = $("#grid");
        if (grid.data("kendoGrid")) {
            grid.data("kendoGrid").destroy();
            grid.empty();
        }
        dataSource = dataSource || {};
        dataSource.serverPaging = true;
        dataSource.serverFiltering = true;
        dataSource.serverSorting = true;
        dataSource.pageSize = 10;
        var grid = grid.kendoGrid({
            dataSource: new kendo.data.DataSource(dataSource),
            height: '100%',
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
     }

     function window(el, title, width) {
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
    
     function editor(el) {    
         if (el.data("kendoEditor")) {
            return el.data("kendoEditor");
         } 
         var editor = el.kendoEditor({
             resizable: {
                 content: false,
                 toolbar: true
             },
             change: function() {
 
             },
             select: function() {
 
             },
             execute: function() {
 
             },
             paste: function() {
 
             },
             tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",
                "createLink",
                "unlink",
                "insertImage",
                "insertFile",
                "subscript",
                "superscript",
                "createTable",
                "addRowAbove",
                "addRowBelow",
                "addColumnLeft",
                "addColumnRight",
                "deleteRow",
                "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize",
                "foreColor",
                "backColor",
                "print"
            ]
         }).data("kendoEditor");
         return editor;
     }

    // 信息提示
    function notification(type) {
        var temp = {};
        type = type || 'success'
        switch(type) {
            case 'success':
                temp = {
                    type: type,
                    template:  $("#successNotification").html()
                }
                break;

            case 'error':
                temp = {
                    type: type,
                    template: $("#errorNotification").html()
                }
                break;
        }
        var notification = $("#notification").kendoNotification({
            position: {
                pinned: true,
                top: 30,
                right: 30
            },
            autoHideAfter: 0,
            stacking: "down",
            templates: [temp]
        }).data("kendoNotification");
        setTimeout(function() {
            notification.hide();
        }, 3000)
        return notification;
    }

     return {
         grid: grid,
         window: window,
         editor: editor,
         notification: notification
     };
});