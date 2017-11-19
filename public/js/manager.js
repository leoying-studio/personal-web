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
     $("#article-window-form").html(
         "<div class='k-content form-item'>"
            +"<label>文章标题</label><input type='text' class='k-textbox' name='title'>"+
         "</div>"+
         "<div class='k-content form-item'>"
            +"<label>文章说明</label><textarea name='description' class='k-textbox'/>"+
         "</div>"+
         "<div class='k-content form-item'>"
            +"<label>所属分类</label>"+articleTypes+
         "</div>"+
        "<div class='k-content form-item'>"
            +"<label>图片地址</label><input type='text' class='k-textbox' name='img'/>"+
         "</div>"+
        "<div class='k-content form-item'>"
            +"<label>导航标记</label>"+"<input type='text' "+
            "class='k-textbox' readonly='readonly' value="+navId+" name='navId'/>"+
         "</div>"+
         "<div class='k-content form-item'>"
            +"<button class='k-button k-default' type='submit'> 确认添加" +
         "</div>"
     );
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

function Grid(el,dataSource, columns) {
    var grid = el.kendoGrid({
        dataSource: {
            data: dataSource,
            pageSize: 50
        },
        height: 800,
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
    $("#nav-menu").kendoMenu({ });
    $("#nav-config-item").click(function() {
        $("#nav-window").kendoWindow({
                width: "400px",
                title: "添加导航模块",
                visible: false,
                actions: [
                    "Pin",
                    "Minimize",
                    "Maximize",
                    "Close"
                ]
        }).data("kendoWindow").center().open();           
    });
    $("#left-tree-menu").kendoMenu({
        orientation: "vertical",
    }).data("kendoMenu").wrapper.css("width", "100%");
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
    var data = $("#articles-value").val();
    data = JSON.parse(data);
    var articleColumns = [
                { field: "title", title: "标题"},
                { field: 'description', title:'文章说明'},
                { field: 'img', title:'图片地址'},
                { field: 'navId', title:'导航id'},
                { field: 'serverTime', title:'发布时间'},
                {title:'操作',command: [
                    {name: 'destroy',text:'删除', click: function() {
                        
                    }},
                    {name: 'edit', text:'编辑', click: function(item) {
                        console.log(grid,item);
                    }},
                ]}
            ];
    Grid($("#grid-article"),data.articles, articleColumns);

    //导航切换
    $("#nav-item-nav").click(function() {
         $("#left-tree-menu").hide();
         var navs =data.navs;
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
         $("#grid-article").remove();
         $(".content-right").eq(0).css({width: '100%'});
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
})
  