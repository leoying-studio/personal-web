define([
    'require',
    'aside',
    'api'
], function(require, aside, api) {
    'use strict';
    var toolbar = $('#toolbar');
    var buttons= $('#toolbar').find('button');
    var buttons= toolbar.find('button');
    var addbutton = buttons.eq(0);
    var categoriesForm = $('#categoriesForm');
    var formButtons = categoriesForm.find('button');
    var back = formButtons.first();
    var submit = formButtons.last();

    var events = {
        'click .label[name=edit]': function(e, f, r) {
            // api.hideTable();
            // themeListForm.attr('_id', r._id);
            // api.setValues(themeListForm, r);
            // themeListForm.show();
        },
        'click .label[name=destory]': function(e, f, r) {
            if (confirm('确认删除吗?')) {
                // debugger;
                // $.post('/intro/theme/map/destory', {
                //     _id: r._id
                // }).then(function(res) {
                //     if (res.status) {
                //         api.message.success('删除成功');
                //         api.refreshTable();
                //      } else {
                //         api.message.error(res.message);
                //      }
                // })
            }
        }
    };

    aside.switchToCategories(function() {
        buttons.not(':first').hide();
        addbutton.attr('nextstep', '#categoriesForm');
        api.initTable('categories', events);
        api.removeAllBread();
        api.insertBread('类别', 'categories', {});
        addbutton.removeClass("disabled");
    });

    back.click(function() {
        categoriesForm.hide();
        api.showTable();
        api.refreshTable();
    });

    submit.click(function() {
       var params = api.getParams(categoriesForm);
       $.post('/categories/save', params)
       .then(function(res) {
            if (res.status) {
                api.message.success('保存成功');
                api.refreshTable();
                api.clearValues(categoriesForm);
            } else {
                api.message.error(res.message);
            }
       });
    });
});