// 初始化加载树组件
var selectedTreeItem = null

$.get("/categories/tree", function(res) {
    const formateTree = function(data) {
        data.forEach(function(item) {
            item.text = item.label;
            item.items = item.children;
            if (item.items.length) {
                formateTree(item.items)
            }
        })
    }

    formateTree(res)

    var onSelect = function(e, data) {
        var tree = $("#cateTree").data("kendoTreeView");
        var dataItem = tree.dataItem(e.node);
        selectedTreeItem = dataItem;
    }

    $("#cateTree").kendoTreeView({
        dataSource: [
            {
                text: '选择分类',
                items: res
            }
        ],
        select: onSelect
    }).data("kendoTreeView")
})

function onOperationCate(value, item, index) {
    return "<button class='btn btn-info mr-3' id='editBtn'>编辑</button><button class='btn btn-danger' id='removeBtn'>删除</button>"
}


const request = {
    remove: function(id) {
        $.post("/categories/remove", {
            id
        }, function(res) {
            // 删除完成， 更新表格
            $("#cateDataTable").bootstrapTable('refresh');
        })
    },
    add: function() {
        var label = $("#categoryName").val();
        var data = {
            label,
            parentId: selectedTreeItem._id
        }
        $.post("/categories/save", data, function(res) {
            if (res.status) {
                $("#cateDataTable").bootstrapTable('refresh');
            }
        })
    }
}


var operationEvents = {
   'click #editBtn': function (e, value, row, index) {
       
   },
   'click #removeBtn': function (e, value, row, index) {
        kendo.confirm("确认删除吗?").then(function () {
            request.remove(row._id)
        });
   }
}

$("#saveCategoryBtn").click(request.add)