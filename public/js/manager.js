
var articleTypes = "";
function selectLeftMenu(nav, cate, data) {
    // 阻止时间冒泡
     this.event.stopPropagation();
     var categories = nav.categories;
     var navId = nav._id;
     var categoryId = cate._id;
     var url = window.location.origin += "/manager/navs/"+navId+"/"+categoryId;
     window.location.href = url;
} 

function addNav(nav, data) {
     articleTypes = "";
     var categories = nav.categories;
     var navId = nav._id;
     for(var c = 0; c < categories.length; c++) {
         articleTypes+="<input type='checkbox' name='categoriesId[]' value="+categories[c]._id+">"+categories[c].name
     }
     $("#blog-cateory").html(articleTypes);
     $("#navId-input").val(navId);
     $("#article-window").kendoWindow({
           width: "500px",
            title: "添加文章列表",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ]
    }).data("kendoWindow").center().open();
}

function Grid(dataSource, columns) {
    $("#grid").html("");
    var rightHeight = $(".right-wrapper").eq(0).height();
    var headerHeight = $(".right-header").eq(0).height();
    var gridHeight = rightHeight - headerHeight - 2 + "px";
    $("#grid").kendoGrid({
        dataSource: {
            data: dataSource,
            pageSize: 50
        },
        height: gridHeight,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns:columns,
        editable: false
    });
}            

$(document).ready(function() {
    // 导航菜单
    $("#nav-menu").kendoMenu({ });
    // 左侧panel
    $("#panelWrapper").kendoPanelBar({
        expandMode: "single"
    });
    // 初始化right-header
    $("#buttonGroup").kendoMobileButtonGroup({
        select: function(e) {
            var index = e.index;
            if (index == 0) {

            } else if (index == 1) {

            } else if (index == 2) {

            }
        },
        index: 0
    });
      // 切换文章类别grid
    $(".panel-item").click(function(e) {
        var nav = JSON.parse($(this).attr("categories"));
        var fields = [
            {field: "name", title: '类别名称'},
            {field: '_id', title:'id'}
        ];
        Grid(nav, fields);
   });

    // $("#nav-config-item").click(function() {
    //     $("#nav-window").kendoWindow({
    //             width: "400px",
    //             title: "添加导航模块",
    //             visible: false,
    //             actions: [
    //                 "Pin",
    //                 "Minimize",
    //                 "Maximize",
    //                 "Close"
    //             ]
    //     }).data("kendoWindow").center().open();           
    // });

    // $("#left-tree-menu").kendoMenu({
    //     orientation: "vertical",
    // }).data("kendoMenu").wrapper.css("width", "100%");

  
    var data = $("#articles-value").val();
    data = JSON.parse(data);
    var currentArticle = null;
    var articleColumns = [
                { field: "title", title: "标题", width: '100px'},
                { field: 'description', title:'文章说明'},
                { field: 'img', title:'图片地址', width: '100px'},
                { field: 'navId', title:'导航id', width: '100px'},
                { field: 'serverTime', title:'发布时间'},
                {title:'操作',command: [
                    {text:'删除', click: function(e) {
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    }},
                    {text:'编辑', click: function(item) {
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                    }},
                    {text:'添加', click: function(e) {
                         currentArticle = this.dataItem($(e.currentTarget).closest("tr"));
                         $("#article-detail-window").kendoWindow({
                            width: "1000px",
                            title: "添加文章详情",
                            visible: false,
                            actions: [
                                "Pin",
                                "Minimize",
                                "Maximize",
                                "Close"
                            ]
                        }).data("kendoWindow").center().open();
                    }}
                ]}
            ];
    Grid($("#grid-article"),data.articles, articleColumns);
    $("#article-detail-content").kendoEditor({ resizable: {
        content: true,
        toolbar: false
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
        "print"
    ]
    });
    $("#article_detail_submit").click(function() {
       var content = $("#article-detail-content").val();        
       var title = $("#article_detail_title").val();
       var categoriesId = currentArticle.categoriesId.toJSON();
       categoriesId = JSON.stringify(categoriesId);
       $.ajax({
            url: '/article/article_detail/submit',
            type:'post',
            data: {
                navId: currentArticle.navId,
                categoriesId:categoriesId,
                articleId: currentArticle._id,
                content: content,
                title: title
            },
            dataType: "json",
            success:function(data) {
                if (data.code == 200) {
                    alert('success');
                }
            },
            error:function(data) {
               alert('error');
            }
       });
    });
    //导航切换
    $("#nav-item-nav").click(function() {
         var navs =data.navs;
         $("#left-wrapper").html("<ul id='panel-bar'><li id='nav-add-btn'>添加</li></ul>");
         $("#nav-add-btn").click(function() {
            $("#nav-window").kendoWindow({
                width: "500px",
                 title: "添加导航",
                 visible: false,
                 actions: [
                     "Pin",
                     "Minimize",
                     "Maximize",
                     "Close"
                 ]
         }).data("kendoWindow").center().open();
         });
         var navColumns = [
                { field: 'name', title:'导航名称'},
                { field: 'serverTime', title:'发布时间'},
                {title:'操作',command: [
                    {name: 'destroy',text:'删除', click: function() {
                        
                    }},
                    {name: 'edit', text:'编辑', click: function(item) {
                       
                    }},
                ]}
         ];
         $("#panel-bar").kendoPanelBar({
            expandMode: "single"
         });
         $("#grid-article").remove();
         Grid($("#grid-nav"),navs,navColumns);
    });

    $("#nav-item-article").click(function() {
        window.location.href = window.location.origin+"/manager"
    });

    $("#nav-add-banner").click(function() {
        $("#banner-window").kendoWindow({
           width: "500px",
            title: "添加首页轮播项",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ]
        }).data("kendoWindow").center().open();
    });
    
});
  