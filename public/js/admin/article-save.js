var selectedTreeItem = null;

$.get("/categories/tree", function (res) {
  const formateTree = function (data) {
    data.forEach(function (item) {
      item.text = item.label;
      item.items = item.children;
      if (item.items.length) {
        formateTree(item.items);
      }
    });
  };

  formateTree(res);

  var onSelect = function (e, data) {
    var tree = $("#cateTree").data("kendoTreeView");
    var dataItem = tree.dataItem(e.node);
    selectedTreeItem = dataItem;
  };

  $("#cateTree")
    .kendoTreeView({
      dataSource: [
        {
          text: "选择分类",
          items: res,
        },
      ],
      select: onSelect,
    })
    .data("kendoTreeView");
});

var request = {
  add: function () {
    if (!selectedTreeItem) {
      return kendo.alert("请选择文章分类");
    }
    var elems = $("#articleForm").find("input[data-field], textarea");
    var articleEditor = $("#articleEditor").data("kendoEditor");
    var recommend = $(":radio[name=recommend]:checked").val();
    var params = {
      categories: [selectedTreeItem._id],
      content: articleEditor.value(),
      recommend,
    };
    $.each(elems, function (index, item) {
      var key = $(item).attr("data-field");
      var value = $(item).val();
      if (key) {
        params[key] = value;
        if (!value) {
          return kendo.alert("缺少值");
        }
      }
    });
    $.post("/article/save", params, function (res) {
      if (res.status) {
        kendo.alert("添加成功");
      }
    });
  },
};

$("#saveArticleBtn").click(function () {
  request.add();
});

$("#articleEditor").kendoEditor({
  resizable: {
    content: true,
    toolbar: true,
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
    "print",
  ],
});

var createFormData = function (file) {
  var formData = new FormData();
  formData.append('image', file);
  return formData;
};

$("#fileUpload").on("change", function (e) {
  var files = e.target.files;
  var file = files[0];
  if (file) {
    var formdata = createFormData(file);
    $.ajax({
      url: "/media/upload",
      type: "POST",
      data: formdata,
      processData: false, //  告诉jquery不要处理发送的数据
      contentType: false, // 告诉jquery不要设置content-Type请求头
      success: function (data) {
        debugger
      },
    });
  }
});
