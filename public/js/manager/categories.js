define([
    'require',
    'api'
], function(require, api) {
    'use strict';
    var toolbar = $('#toolbar');
    var form = $('form');
    var back = $('#back');
    var save = $("#save");
    var addBtn = $("#addBtn");
    var table = $("#table");

    var events = {
        'click .label[name=edit]': function(e, f, r) {
            api.hideTable();
            api.setValues(form, r);
            form.attr('_id', r._id).show();
            form.show();
        },
        'click .label[name=destory]': function(e, f, r) {
            if (confirm('确认删除吗?')) {

            }
        }
    };

    api.initTable('categories', events, {});

    back.click(function() {
        form.hide();
        api.showTable();
        api.refreshTable();
    });

    save.click(function() {
        var params = api.getParams(form);
        params._id = form.attr('_id');
        $.post('/categories/save', params)
        .then(function(res) {
            if (res.status) {
               api.clearValues(form);
               api.message.success('保存成功');
               return;
            }
            api.message.error(res.message);
        });
    });

    addBtn.click(function() {
        form.show();
        api.hideTable();
    });
});