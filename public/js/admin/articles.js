function onOperationOptions(value, item, index) {
    return  "<a href=/admin/articles/save/view?id="+ item._id +" target='pageFrame'><span class='icon iconfont icon-edit text-danger  mr-3' id='editBtn'></span></a><span class='icon iconfont icon-delete text-danger' id='removeBtn' ></span>"
}

function onFomatterRecommend(value, item, index) {
    return value ? '是' : '否';
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


 $('.toolbar-right').addClass('col-md-12')