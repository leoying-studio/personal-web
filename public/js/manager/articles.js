define([
    'require',
    'api'
], function (require, api) {
    'use strict';
    var toolbar = $('#toolbar');
    var form = $('#form');
    var save = $("#save");
    var dropName = $('#dropName');
    var dropSubName = $('#dropSubName');
    // 一级下来分类菜单面板
    var dropSubcate = $('#dropSubcate');
    // 二级级下来分类菜单面板
    var dropCate = $('#dropCate');
    var categoryId = '';
    var subId = '';
    var articleId = "";
    var addBtn = $("#addBtn");
    var back = $("#back");
    // 当前选择类别
    var currentCate = {};
    var checkItem = form.children('.checkbox-item');


    back.click(function () {
        form.hide();
        api.showTable();
    });


    var switchCate = function (data) {
        dropCate
            .children()
            .click(function (e) {
                var index = $(this).index();
                currentCate = data[index];
                dropName.text(data[index].name);
                categoryId = data[index]._id;
                dropName.append('&nbsp;&nbsp;<span class="caret"></span>');
                getSubCate(data[index].subcategories);
            });
    }

    //  切换二级分类
    var switchSub = function (data) {
        dropSubcate
            .children()
            .click(function (e) {
                var index = $(this).index();
                subId = data[index]._id;
                dropSubName.text(data[index].name);
                subId = data[index]._id;
                dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
                initTable();
            });
    }

    var getSubCate = function (data) {
        var html = "";
        $(data).each(function (index, category) {
            html += "<li><a href='#'>" + category.name + "</a></li>";
        });
        dropSubcate.html(html);
        if (data.length) {
            addBtn.removeClass("disabled");
            dropSubName.html(data[0].name);
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
            switchSub(data);
            subId = data[0]._id;
        } else {
            addBtn.addClass("disabled");
            dropSubName.text('没有更多分类');
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
        }
        initTable();

    }

    // 初始化选中类别
    var initActiveCate = function (data) {
        if (data.length) {
            var first = data[0];
            currentCate = first;
            categoryId = first._id;
            dropName.text(first.name);
            if (first.subcategories.length) {
                var subFirst = first.subcategories[0];
                subId = subFirst._id;
                dropSubName.text(subFirst.name);
                initTable();
                return;
            }
        }
        addBtn.addClass('disabled');
    }

    var getCategories = function () {
        $.get('/categories/data')
            .then(function (data) {
                dropCate.children().remove();
                $(data).each(function (index, category) {
                    dropCate.append(
                        "<li><a href='#'>" + category.name + "</a></li>"
                    );
                });
                if (data.length) {
                    getSubCate(data[0].subcategories);
                }
                initActiveCate(data);
                switchCate(data);
            });
    }

    // 添加二级分类到表单
    var addSubcateToForm = function (data) {
        checkItem.children().not(":first-child").remove();
        $(data).each(function (index, item) {
            checkItem.append("<div class='check-box inline'><span>" + item.name + "</span><input type='checkbox' name='subIds' value=" + item._id + "></div>");
        });
    }

    var events = {
        "click .label[name=edit]": function (e, f, r) {
            articleId = r._id;
            addSubcateToForm(currentCate.subcategories);
            api.setValues(form, r);
            api.hideTable();
            form.show();
        },
        "click .label[name=destory]": function (e, f, r) {
            if (confirm('确认删除当前文章吗?')) {
                $.post("/articles/delete", {
                        articleId: r._id
                    })
                    .then(function (res) {
                        if (res.status) {
                            api.message.success('删除成功');
                            api.refreshTable();
                        }
                        api.message.error(res.message);
                    });
            }
        }
    };

    var initTable = function () {
        api.initTable('articles', events, {}, {
            categoryId: categoryId,
            subId: subId
        });
    }


    save.click(function () {
        var params = api.getParams(form);
        params.categoryId = categoryId;
        params.articleId = articleId;
        $.ajax({
            method: "post",
            url: "/articles/save",
            data: params,
            success: function (res) {
                if (res.status) {
                    api.clearValues(form);
                    api.message.success('保存成功');
                    return;
                }
                api.message.error(res.message);
            }
        });
    });

    addBtn.click(function () {
        if ($(this).hasClass("disabled")) {
            return;
        }
        articleId = "";
        addSubcateToForm(currentCate.subcategories);
        form.show();
        api.hideTable();
    });

    back.click(function () {
        form.hide();
        api.refreshTable();
        api.showTable();
    });


    getCategories();

    initTable();

});