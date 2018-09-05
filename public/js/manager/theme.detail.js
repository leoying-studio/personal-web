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
    var dropdown = toolbar.find('.dropdown');
    var buttons= toolbar.find('button');
    var dropGroup = $('#dropGroup');
    var addbutton = buttons.eq(0);
    var itemForm = $('#itemForm');
    var formSubmit = itemForm.find('.submit');
    var dropName = $('#dropName');

    	
       // 业务常量
	var events = {
		theme: {
			'click .label[name=edit]': function(e, f, r) {
				api.hideTable();
				var form = $('#themeForm');
				form.attr('themeId', r._id);
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
		},
	};
	
    var events = {
        'click .label[name=edit]': function(e, f, r) {
            api.hideTable();
            itemForm.attr('_id', r._id);
            api.setValues(itemForm, r);
            itemForm.show();
        },
        'click .label[name=destory]': function(e, f, r) {
            if (confirm('确认删除吗?')) {
                $.post('/intro/theme/map/destory', {
                    _id: r._id
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

    // 获取主题分类
    var getThemeCategories = function() {
        $.get('/intro/themes/data').then(function(data) {
            dropGroup.children().remove();
            $(data).each(function(index, item) {
                dropGroup.append('<li><a href="#">'+item.headline+'</a></li>');
            });
            var chooseTheme = function(theme) { 
                dropName.text(theme.headline);
                dropName.append('&nbsp;&nbsp;<span class="caret"></span>');
                api.initTable('themeList', {}, {}, theme._id);
            }
            dropGroup.children().click(function() {
                var index = $(this).index();
                chooseTheme(data[index]);
            });
            if (data.length) {
                var firstCateory = data[0];
                chooseTheme(firstCateory);
            }
        });
    }

    itemForm.find('.back').click(function() {
        itemForm.removeAttr('_id');
        itemForm.hide();
        getThemeCategories();
        api.showTable();
    });

    formSubmit.click(function() {
        var params = api.getParams(itemForm);
        params.themeId = itemForm.attr('themeId');
        params._id = itemForm.attr('_id');
        $.post('/intro/themes/item/save', params)
        .then(function(res) {
            if (res.status) {
                api.message.success('保存成功');
                api.clearValues(itemForm);
             } else {
                api.message.error(res.message);
             }
        });
    });

    getThemeCategories();
});    
    
    
 