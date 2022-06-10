function onOperationCate(value, item, index) {
    return "<button class='btn btn-info mr-3' id='editBtn'>编辑</button><button class='btn btn-danger' id='removeBtn'>删除</button>"
}

function onFormateRecommendPic(value, item, index) {
    if (value) {
        var src = document.location.origin + "/" + value;
        return "<img width='100px' src="+ src + ">"
    }

    return "-"
}

var request = {
    remove: function(id) {
        $.post("/articles/remove", {id}, function(res) {
            $("#articlesDataTable").bootstrapTable('refresh');
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