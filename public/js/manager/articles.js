define([
    'require',
    'api'
], function(require, api) {
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
 

    back.click(function() {
        form.hide();
        api.showTable();
    });


    var switchCate = function(data) {
        dropCate
        .children()
        .click(function(e) {
            var index = $(this).index();
            currentCate = data[index];
            dropName.text(data[index].name);
            categoryId = data[index]._id;
            dropName.append('&nbsp;&nbsp;<span class="caret"></span>');
            getSubCate(data[index].subcategories);
        });
    }

    //  切换二级分类
    var switchSub = function(data){
        dropSubcate
        .children()
        .click(function(e) {
            var index = $(this).index();
            subId = data[index]._id;
            dropSubName.text(data[index].name);
            subId = data[index]._id;
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
           
        });
    }   

    var getSubCate = function(data) {
        var html = "";
        $(data).each(function(index, category) {
            html += "<li><a href='#'>" +category.name+ "</a></li>";
        });
        dropSubcate.html(html);
        if (data.length) {
            addBtn.removeClass("disabled");
            dropSubName.html(data[0].name);
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
            switchSub(data); 
            initTable();
            subId = data[0]._id;
            return; 
        }

        addBtn.addClass("disabled");
        dropSubName.text('没有更多分类');
        dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
    }

    // 初始化选中类别
    var initActiveCate = function(data) {
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

    var getCategories = function() {
        $.get('/categories/data')
        .then(function(data) {
            dropCate.children().remove();
            $(data).each(function(index, category) {
                dropCate.append(
                    "<li><a href='#'>" +category.name+ "</a></li>"
                );
            });
            initActiveCate(data);
            switchCate(data);   
        });
    }

    var initTable = function() {
        api.initTable('articles', {}, {}, {
            categoryId: categoryId,
            subId: subId
        });
    }

    save.click(function() {
        var params = api.getParams(form);
        params.categoryId = categoryId;
        params.articleId = articleId;
        $.ajax({
            method:"post",
            url: "/articles/save",
            data: params,
            success: function(res) {
                if (res.status) {
                    api.clearValues(form);
                    api.message.success('保存成功');
                    return;
                }
                api.message.error(res.message);
            }   
        });
        
    }); 

    getCategories();

    var events = {};

    api.initTable("articles", events, {}, {});

    addBtn.click(function() {
        if ($(this).hasClass("disabled")) {
            return;
        }
        articleId = "";
        checkItem.children().remove();
        $(currentCate.subcategories).each(function(index, item) {
            checkItem.append("<div class='check-box'><span>"+ item.name +"</span><input type='checkbox' name='subIds' value="+item._id+"></div>");
        });
        form.show();
        api.hideTable();
    });
    
    back.click(function() {
        form.hide();
        api.showTable();
    });
});