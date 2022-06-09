// 初始化加载树组件


var selecedNode = null
var dialog = $("#dialogs").kendoDialog({
    width: "400px",
    title: "Software Update",
    closable: true,
    modal: false,
    content: "<p>确认删除吗<p>",
    actions: [
        { text: '取消' },
        { text: '确认', primary: true }
    ]
});
// function confirmBox() {
//     var dialog = $("#dialogs").kendoDialog({
//         width: "400px",
//         title: "Software Update",
//         closable: true,
//         modal: false,
//         content: "<p>确认删除吗<p>",
//         actions: [
//             { text: '取消' },
//             { text: '确认', primary: true }
//         ]
//     });
//     return dialog;
// }

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
        selecedNode = e.node
    }

    $("#categoriesTree").kendoTreeView({
        dataSource: [
            {
                text: '选择分类',
                items: res
            }
        ],
        select: onSelect
    }).data("kendoTreeView")
})


var modalInstance = null

$("#confirmationOkBtn").click(function() {
    // $("#confirmationBox").modal('hide')
})

function onOperationCate(value, item, index) {
    return "<button class='btn btn-info mr-3' id='editBtn'>编辑</button><button class='btn btn-danger' id='removeBtn'>删除</button>"
}

var operationEvents = {
   'click #editBtn': function (e, value, row, index) {
       
   },
   'click #removeBtn': function (e, value, row, index) {
    //    var box = confirmBox()
       dialog.data("kendoDialog").open()
   }
}

$("#saveCategoryBtn").click(function() {
    var label = $("#categoryName").val();
    // var cateId = $("")
    var data = {
        label
    }
    $.post("/categories/save", data, function(res) {
        if (res.status) {
            
        }
    })
})