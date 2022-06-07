// 初始化加载树组件
$.get("/categories/tree", function(res) {
    const formateTree = function(data) {
        data.forEach(function(item) {
            item.text = item.label;
            item.nodes = item.children;
            if (item.children.length) {
                formateTree(item.nodes)
            }
        })
    }

    formateTree(res)
    $("#categoriesTree").treeview({
        data: res
    })


    $('#categoriesTree').on('nodeChecked', function(event, data) {
        // Your logic goes here
    });
})


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