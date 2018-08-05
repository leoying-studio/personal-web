define([
    'require',
    'api',
    'jquery'
], function(require, api, $) {
    'use strict';

    var toolbar = $('#toolbar');
    var dropName = $('#dropName');
    var dropGroup = $('#dropGroup');
    var form = $('#form');
    var back = $('#back');
    var save = $('#save');
    var _id = '';

    var events = {
        'click .label[name=edit]': function(e, f, r) {
            api.hideTable();
            form.attr('subId', r._id);
            api.setValues(form, r);
            form.show();
        },
        'click .label[name=destory]': function(e, f, r) {
            if (confirm('确认删除吗?')) {
                $.post('/intro/themes/destory', {
                    themeId: r._id
                }).then(function(res) {
                    if (res.status) {
                        api.message.success('删除成功');
                        api.refreshTable();
                     } else {
                        api.message.error(res.message);
                     }
                })
            }
        }
    };

    // // 分类切换选择
    var chooseSubCategories = function(data) {
        _id = data._id;
        dropName.text(data.name);
        dropName.append('&nbsp;&nbsp;<span class="caret"></span>');
        api.initTable('subcategories', events, {}, data.subcategories);
    }

    // 请求数据
    var getCategories = function() {
        $.get('/categories/data').then(function(data) {
            dropGroup.children().remove();
            $(data).each(function(index, item) {
                dropGroup.append('<li><a href="#">'+item.name+'</a></li>');
            });
            if (data.length) {
                var firstCategory = data[0];
                chooseSubCategories(firstCategory);
                // 重新注册
                dropGroup.children().click(function() {
                     var index = $(this).index();
                     chooseSubCategories(data[index]);
                });
            }
        });
    }

    getCategories();
  
    // // 返回按钮回调
    back.click(function() {
        form.hide();
        getCategories();
        api.showTable();
    });

    save.click(function() {
        var params = api.getParams(form);
        params.subId = form.attr('subId');
        params._id = _id;
        $.post('/categories/subcategory/save', params)  
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