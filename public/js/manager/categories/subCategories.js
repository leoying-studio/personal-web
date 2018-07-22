define([
    'require',
    'aside',
    'api'
], function(require, aside, api) {
    'use strict';
    var toolbar = $('#toolbar');
    var commDropwn = $('#common-dropdown');
    var dropdown = commDropwn.find('.dropdown-menu');
    var dropdownActive = commDropwn.find('.dropdown-menu-active');
    var buttons= commDropwn.find('button');
    var addbutton = buttons.eq(0);
    var form = $('#subCategoriesForm');
    var back = form.find('button:first');
    var save = form.find('button:last');

    var events = {};

    // 分类切换选择
    var chooseSubCategories = function(data) {
        form.attr('_id', data._id);
        dropdownActive.text(data.name);
       
        api.initTable('subCategories', events, {}, data.subcategories);
    }

    // 请求数据
    var getData = function() {
        $.get('/categories/data').then(function(data) {
            api.removeAllBread();
            api.insertBread('子级分类', 'subCategories', {});
            dropdown.children().remove();
            $(data).each(function(index, item) {
              dropdown.append('<li><a href="#">'+item.name+'</a></li>');
            });
            if (data.length) {
                var firstCategory = data[0];
                chooseSubCategories(firstCategory);
                // 重新注册
                dropdown.children().click(function() {
                     var index = $(this).index();
                     chooseSubCategories(data[index]);
                });
            }
        });
    }
  
    // 左侧回调切换
    aside.switchToSubCategories(function() {
       buttons.show();
       addbutton.removeClass("disabled");
       addbutton.attr('nextstep', '#subCategoriesForm');
       getData();
    });

    // 返回按钮回调
    back.click(function() {
        form.hide();
        getData();
        api.showTable();
    });

    save.click(function() {
        var params = api.getParams(form);
        params._id = form.attr('_id');
        $.post('/categories/subCategory/save', params)
        .then(function(res) {
            if (res.status) {
                api.clearValues(form);
                api.message.success('保存成功');
                return;
             }
             api.message.error(res.message);
        });
    });
});     