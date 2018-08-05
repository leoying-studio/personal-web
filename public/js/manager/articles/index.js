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
    var dropSubGroup = $('#dropSubGroup');
    var dropGroup = $('#dropGroup');
    var dropId = '';
    var subId = '';


    save.click(function() {

    });

    back.click(function() {
        form.hide();
        api.showTable();
    });

    var createCategories = function(data) {
        dropGroup.children().remove();
        $(data).each(function(index, category) {
            dropGroup.append(
                "<li><a href='#'>" +category.name+ "</a></li>"
            );
        });
        switchCate(data);
    }

    var switchCate = function(data) {
        dropGroup
        .children()
        .click(function(e) {
            var index = $(this).index();
            dropName.text(data[index].name);
            dropId = data[index]._id;
            subId = data[0].subcategories._id;
            dropName.append('&nbsp;&nbsp;<span class="caret"></span>');
            getSubCate(data[index].subcategories);
        });
    }

    //  切换二级分类
    var switchSub = function(data){
        dropSubGroup
        .children()
        .click(function(e) {
            var index = $(this).index();
            subId = data[index]._id;
            dropSubName.text(data[index].name);
            subId = data[index]._id;
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
            api.initTable('articles', {}, {}, {
                categoryId: dropId,
                subId: subId
            });
        });
    }   

    var getSubCate = function(data) {
        var html = "";
        $(data).each(function(index, category) {
            html += "<li><a href='#'>" +category.name+ "</a></li>";
        });
        dropSubGroup.html(html);
        if (data.length) {
            dropSubName.html(data[0].name);
            dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
            switchSub(data); 
            api.initTable('articles', {}, {}, {
                categoryId: dropId,
                subId: subId
            });
            return 
        }
        dropSubName.text('没有更多分类');
        dropSubName.append('&nbsp;&nbsp;<span class="caret"></span>');
    }

    var getCategories = function() {
        $.get('/categories/data')
        .then(function(categories) {
            createCategories(categories);
        });
    }

    getCategories();


    
});