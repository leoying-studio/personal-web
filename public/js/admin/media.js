function onFormatterMedia(value, item, index) {
    if (value) {
        var src = document.location.origin + "/uploads" + "/" + value;
        return "<img width='100px' src="+ src + ">"
    }
    return "-"
}

function onFormatterOption() {
    return  "<span class='icon iconfont icon-delete text-danger' id='removeBtn' ></span>"
}

var request = {
    remove: function(id) {
        $.post("/media/remove", {id}, function(res) {
            $("#mediaDataTable").bootstrapTable('refresh');
        })
    }
}

var operationEvents = {
    'click #removeBtn': function (e, value, row, index) {
         kendo.confirm("确认删除吗?").then(function () {
             request.remove(row._id)
         });
    }
 }