var articleTypes = "";
function selectLeftMenu(nav, cate, data) {
    //  newGrid();
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
} 


function newGrid(data) {
      $("#grid").kendoGrid({
            dataSource: {
                data: data,
                // schema: {
                //     model: {
                //         fields: {
                //             title: { type: "string" },
                //         }
                //     }
                // },
                pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                input: true,
                numeric: false
            },
            columns: [
                { field: "title", title: "标题"},
                { field: 'description', title:'文章说明'},
                { field: 'img', title:'图片地址'},
                { field: 'navId', title:'导航id'},
                { field: 'serverTime', title:'发布时间'},
            ]
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
    }).data("kendoMenu").wrapper.css("width", "18%");
    $("#nav-add-btn").click(function() {
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
    });
    var articles = $("#articles-value").val();
    articles = JSON.parse(articles);
    newGrid(articles);
})
  