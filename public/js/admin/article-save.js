var selectedTreeItem = null;
var recommendPicturePath = ""
var selectorTree = null

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
    selectorTree = $("#articleSelectorTree").selectorTree(res)
  })
}

var request = {
  add: function () {
    var categoryId = selectorTree.getValue()
    if (!categoryId) {
      return kendo.alert("请选择文章分类");
    }
    if (!recommendPicturePath) {
      return kendo.alert("请上传推荐图");
    }
    var elems = $("#articleForm").find("input[data-field], textarea");
    var articleEditor = $("#articleEditor").data("kendoEditor");
    var recommend = $(":radio[name=recommend]:checked").val();
    var params = {
      categories: [categoryId],
      content: articleEditor.value(),
      recommend,
      recommendPicture: recommendPicturePath
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

$("#articleUploader").uploader({
  url: '/media/upload',
  success: function(url) {
    recommendPicturePath = url;
  }
})

getTree()