// 初始化加载树组件
var selectedTreeItem = null;
var selectorTree = null;
var updateModal = $('#categoryUpdateModal');
var updateModalButton = updateModal.find('button:last-child')
var updateModalInput = updateModal.find('input')
var updateRow = {}

var getTree = function() {
    $.get("/cate/tree", function(res) {
        var formateSource = function(children) {
            children.forEach(function(item) {
                item.value = item._id;
                if (item.children.length) {
                    formateSource(item.children)
                }
            })
        }
    
       formateSource(res)
       selectorTree = $("#cateSelectorTree").selectorTree(res)
    })
}

getTree();

function onOperationCate(value, item, index) {
    return "<span class='icon iconfont icon-edit text-info  mr-3' id='editBtn'></span></span>"
}

const request = {
    remove: function(id) {
        $.post("/cate/remove", {
            id
        }, function(res) {
            // 删除完成， 更新表格
            $("#cateDataTable").bootstrapTable('refresh');
            getTree();
        })
    },
    add: function() {
        var label = $("#categoryName").val();
        var parentId = selectorTree.getValue()
        var data = {label}
        if (parentId) {
            data.parentId = parentId;
        }
        $.post("/cate/save", data, function(res) {
            if (res.status) {
                $("#cateDataTable").bootstrapTable('refresh');
                getTree();
            }
        })
    },
    update: function() {
        var label = updateModalInput.val();
        if (!label) {
            return alert("请填写名称")
        }
        var params = Object.assign({label, id: updateRow._id, value: updateRow.value, parentId: updateRow.parentId })
        $.post("/cate/save", params, function(res) {
                $("#cateDataTable").bootstrapTable('refresh');
                getTree();
        })
    }
}

var operationEvents = {
   'click #editBtn': function (e, value, row, index) {
        updateRow = row;
        updateModalInput.val(row.label)
        updateModal.modal({});
   },
   'click #removeBtn': function (e, value, row, index) {
        kendo.confirm("确认删除吗?").then(function () {
            request.remove(row._id)
        });
   }
}

$("#categoryModal").on('show.bs.modal', function(e) {
    $(this).find('input').val('');
})

$("#saveCategoryBtn").click(request.add)
updateModalButton.click(request.update)

