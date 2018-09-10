define([
    'require',
    'jquery',
    'api',
    'aside',
    'config'
], function(require, $, api, aside, config) {
    var main = $('#main'), asideBar = $('.aside-bar');
    var toolbar = $('#toolbar');
    var addBtn = $('#addBtn');
    var form = $('#form');
    var save = $('#save');
    var back = $('#back');
	
    var events = {
        'click .label[name=edit]': function(e, f, r) {
            api.hideTable();
            form.attr('_id', r._id);
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

    var requestSave = function() {
        var params = api.getParams(form);
        params._id = form.attr('_id');
        $.post('/intro/theme/save', params)
        .then(function(res) {
            if (res.status) {
                api.message.success('保存成功');
            } else {
                api.message.error(res.message);
            }
        });
    }

    // 获取主题分类
    api.initTable('theme', events, {});

    save.click(function() {
        requestSave();
    });

    addBtn.click(function() {
       api.hideTable();
       form.show();
       api.clearValues(form);
    });

    back.click(function() {
       form.removeAttr('_id');
       form.hide();
       api.refreshTable();
       api.showTable();
    });
   
});