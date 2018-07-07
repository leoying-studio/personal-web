define([
    'require',
    'jquery',
    'api',
    'aside',
    'config'
], function(require, $, api, aside, config) {
    var main = $('#main'), asideBar = $('.aside-bar');
    var breadcrumb = main.find('.breadcrumb');
    var toolbar = $('#toolbar');
    var dropdowm = toolbar.find('.dropdown-menu');
    var dropdownActive = toolbar.find('.dropdown-menu-active');
    var buttons= toolbar.find('button');
    var addbutton = buttons.eq(0);
    var themeListForm = $('#themeListForm');
    var formSubmit = themeListForm.find('.submit');
    aside.switchToTheme(function() {
        buttons.show();
        api.removeAllBread();
        api.insertBread('主题列表', 'themeMap', {});
        getThemeCategories();
        // 设置下一步点击
        addbutton.attr('nextstep', '#themeListForm');
    });



    var events = {
        'click .label[name=edit]': function(e, f, r) {
            api.hideTable();
            themeListForm.attr('mapId', r._id);
            api.setValues(themeListForm, r);
            themeListForm.show();
        },
        'click .label[name=destory]': function(e, f, r) {
            if (confirm('确认删除吗?')) {
                // $.post('/intro/themes/destory', {
                //     themeId: r._id
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

    // 获取主题分类
    var getThemeCategories = function() {
        $.get('/intro/themes/data').then(function(data) {
            dropdowm.children().remove();
            $(data).each(function(index, item) {
                dropdowm.append('<li><a>'+item.headline+'</a></li>');
            });
            var chooseTheme = function(theme) {
                dropdownActive.text(theme.headline);
                themeListForm.attr('themeId', theme._id);
                api.initTable('themeList', events, {}, theme.map);
            }
            dropdowm.children().click(function() {
                var index = $(this).index();
                chooseTheme(data[index]);
            });
            if (data.length) {
                var firstCateory = data[0];
                chooseTheme(firstCateory);
            }
        });
    }

    themeListForm.find('.back').click(function() {
        themeListForm.removeAttr('mapId');
        themeListForm.hide();
        getThemeCategories();
        api.showTable();
    });

    formSubmit.click(function() {
        var params = api.getParams(themeListForm);
        params.themeId = themeListForm.attr('themeId');
        params.mapId = themeListForm.attr('mapId');
        $.post('/intro/themes/item/save', params)
        .then(function(res) {
            if (res.status) {
                api.message.success('保存成功');
                api.clearValues(themeListForm);
             } else {
                api.message.error(res.message);
             }
        });
    });
});