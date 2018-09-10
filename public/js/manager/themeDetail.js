define([
    'require',
    'jquery',
    'api',
    'aside',
    'config'
], function(require, $, api, aside, config) {
    var toolbar = $('#toolbar');
    var buttons= toolbar.find('button');
    var dropGroup = $('#dropGroup');
    var addbutton = buttons.eq(0);
    var dropName = $('#dropName');
    var form = $("#form");
    var submit = $("#submit");
    var back = $("#back");
    var themeId = "";
    	
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
                themeId = theme._id;
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

    submit.click(function() {
        var params = api.getParams(form);
        params.themeId = themeId;
        params._id = form.attr('_id');
        $.post('/intro/themes/item/save', params)
        .then(function(res) {
            if (res.status) {
                api.message.success('保存成功');
                api.clearValues(form);
             } else {
                api.message.error(res.message);
             }
        });
    });

    back.click(function() {
        form.removeAttr('_id');
        form.hide();
        getThemeCategories();
        api.showTable();
    });

    addbutton.click(function() {
        api.hideTable();
        form.show();
    });

    getThemeCategories();
});    
    
    
 