define(['require', 'utils', 'init'], function (require, utils, init) {
    var columns = {};
    var articles = [
        { field: "title", title: "标题", width: '200px' },
        { field: 'description', title: '文章说明' },
        { field: 'img', title: '图片地址', width: '100px' },
        { field: 'navId', title: '导航id', width: '100px' },
        { field: 'createdTime', title: '发布时间', width: '250px' },
    ]
    // article
    columns.articles = function (destroy, edit) {
        var newArticles = articles.concat(
            [
                {
                    title: '操作', width: '200px', command: [
                        {
                            text: '删除', click: destroy || new Function()
                        },
                        {
                            text: '编辑', click: edit || new Function()
                        }
                    ]
                }
            ]
        );
        return newArticles;
    }

    // 文章推荐
    columns.homeRecommend = function (cancel) {
        var newArticles = articles.concat(
            [
                {
                    title: '操作', width: '200px', command: [
                        {
                            text: '取消推荐', click: cancel || new Function()
                        }
                    ]
                }
            ]
        );
        return newArticles;
    }

    // 类别
    columns.categories = function (destroy, edit) {
        var categories = [
            { field: 'name', title: '类别名称' },
            { field: '_id', title: 'id' },
            {
                title: '操作', command: [
                    // {
                    //     text: '删除', click: destroy || new Function()
                    // },
                    {
                        text: '编辑', click: edit || new Function()
                    }
                ]
            }
        ]
        return categories;
    }

    // 导航
    columns.navs = function (destroy, edit) {
        var navs = [
            { field: 'name', title: '导航名称' },
            { field: '_id', title: 'id' },
            {
                title: '操作', command: [
                    // { name: 'destroy', text: '删除', click: destroy || new Function},
                    {text: '编辑', click: edit || new Function},
                ]
            }
        ]
        return navs;
    }

    // 介绍信息
    columns.intro = function(destroy, apply, edit) {
        var func = function() {};
        var intro = [
            {field: "title", title: "标题"},
            {field: "caption", title: "字幕"},
            {field: "description", title: "说明"},
            {field: "createdTime", title: "添加时间"},
            {
                title:'操作', command: [
                    {text: "删除", click: destroy || func},
                    {text: '应用', click: apply || func},
                    {text: "编辑", click: edit || func},
                ]
            }
        ];
        return intro;
    }
    
    columns.special = function(destroy, edit) {
        var func = function() {};
        var special = [
            // {field: "title", title: "标题"},
            {field: "headline", title: "标题"},
            {field: "homeFigure", title: "说明"},
            {field: "createdTime", title: "添加时间"},
            {
                title:'操作', command: [
                    {text: "删除", click: destroy || func},
                    {text: '编辑', click: edit || func}
                ]
            }
        ];
        return special;
    }
    columns.themes = function(destroy, edit) {
        var func = function() {};
        var themes = [
            {field: "presentation", title: "描述"},
            {field: "photo", title: "照片"},
            {
                title:'操作', command: [
                    {text: "删除", click: destroy || func},
                    {text: '编辑', click: edit || func}
                ]
            }
        ];
        return themes;
    }
    // editor
    var editor = {
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
        ],
        resizable: {
            content: true,
            toolbar: false
        },
    };



    return {
        columns: columns,
        editor: editor
    };
});