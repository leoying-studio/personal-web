var selectedTreeItem = null;
var recommendPicturePath = "";
var selectorTree = null;
var articleEditor = $("#articleEditor");
var uploader = null;

// 处理编辑显示逻辑
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var articleId = getQueryVariable('id');

var setFormFields = function(data) {
  var elems = $("#articleForm").find("input[data-field], textarea");
  articleEditor.data('kendoEditor').value(data.content)
  var recommendRadios = $(":radio[name=recommend]")
  if (data.recommend) {
    $(recommendRadios[0]).attr('checked', true)
  } else {
    $(recommendRadios[1]).attr('checked', true)
  }
  uploader.setDefaultImage(data.recommendPicture)
  var categoryId = data.categories[0]
  if (categoryId) {
    selectorTree.setValue(categoryId)
  }
  $.each(elems, function (index, item) {
    var key = $(item).attr("data-field");
    $(item).val(data[key]);
  });
}


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

    if (articleId) {
      $.get("/articles/one", {
         id: articleId
      }, function(res) {
         if (res.status) {
           setFormFields(res.data)
         }
      })
  }
  })
}

var request = {
  save: function () {
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
    if (articleId) {
       params['id'] = articleId
    }
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
        var text = articleId ? '更新成功' : '添加成功';
        kendo.alert(text);
      }
    });
  },
};

$("#saveArticleBtn").click(function () {
  request.save();
});

articleEditor.kendoEditor({
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

uploader = $("#articleUploader").uploader({
  url: '/media/upload',
  success: function(url) {
    recommendPicturePath = url;
  }
})

getTree()