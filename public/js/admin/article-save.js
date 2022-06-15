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


$("#articleUploader").uploader({
  
})

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

var createFormData = function (file) {
  var formData = new FormData();
  formData.append('image', file);
  return formData;
};


var refreshUploaderImage = function(path) {
   var origin = document.location.origin;
   var src = origin + "/" + path
   var i = $("#uploader").children("i");
   if (i) {
     i.remove();
   }
   var img = $("#uploader").children("img")
   if (img.length) {
      img[0].attr({
        src
      })
   } else {
    var img = $("<img />").css({
      width: "100%",
      height: "100%"
    }).attr({
      src
    })
    $("#uploader").append(img)
   }
}

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
      success: function (res) {
        recommendPicturePath = res.data
        refreshUploaderImage(res.data)
      },
    });
  }
});


getTree()