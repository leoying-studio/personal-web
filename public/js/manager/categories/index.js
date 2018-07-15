define([
    'require',
    'aside',
    'api'
], function(require, aside, api) {
    'use strict';
    var buttons= $('#toolbar').find('button');
    var buttons= toolbar.find('button');
	var addbutton = buttons.eq(0);

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
        api.initTable('categories', events);
        api.removeAllBread();
        api.insertBread('类别', 'categories', {});
        addbutton.removeClass("disabled");
    });
});