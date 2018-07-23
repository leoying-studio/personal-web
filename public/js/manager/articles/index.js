define([
    'require',
    'aside'
], function(require, aside) {
    'use strict';
    var toolbar = $('#toolbar');
    var commDrop = $('#common-dropdown');
    var articlesToolbar = $("#articles-toolbar");
    var categoriesDropPanel = $('#categoriesDropPanel');
    var subcategoriesDropPanel = $('#subcategoriesDropPanel');
    var categoriesMenu = $("#categoriesMenu");
    var subcategoriesMenu = $("#subcategoriesMenu");
    var icon = " <span class='caret'><span class='sr-only'></span></span>";
    var createCategories = function(data) {
        $(data).each(function(index, category) {
            categoriesDropPanel.append(
                "<li><a href='#'>" +category.name+ "</a></li>"
            );
        });
        switchCate(data);
    }

    var switchCate = function(data) {
        categoriesDropPanel
        .children()
        .click(function(e) {
            var index = $(this).index();
            
            categoriesMenu.html(data[index].name + icon);
            getSubCate(data[index].subcategories);
        });
    }

    var getSubCate = function(data) {
        var html = "";
        $(data).each(function(index, category) {
            html += "<li><a href='#'>" +category.name+ "</a></li>";
        });
        subcategoriesDropPanel.html(html);
        if (data.length) {
            return subcategoriesMenu.html(data[0].name + icon);
        }
        subcategoriesMenu.html('没有更多分类' + icon);
    }

    var getCategories = function() {
        $.get('/categories/data')
        .then(function(categories) {
            createCategories(categories);
        });
    }

    aside.switchToArticles(function() {
        commDrop.hide();
        articlesToolbar.show();
        getCategories();
    });

    
});