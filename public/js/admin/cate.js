// 初始化加载树组件
$.get("/categories/tree", function(res) {
    const formateTree = function(data) {
        data.forEach(function(item) {
            item.text = item.label;
            item.nodes = item.children;
            item.state = {
                expanded: false
            }
            item.icon = "icon iconfont icon-add-bold"
            item.selectedIcon = "icon iconfont icon-minus-bold"
            if (item.children.length) {
                formateTree(item.nodes)
            }
        })
    }

    formateTree(res)

    $("#categoriesTree").treeview({
        data: res,
        showCheckbox:false,
        multiSelect:false
    })

    $('#categoriesTree').on('nodeChecked', function(event, data) {
        // Your logic goes here
    });
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
    // modalInstance = $("#confirmationBox").modal('show')
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