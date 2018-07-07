define([
    'require',
    'jquery',
    'config'
], function (require, $, config) {
    var main = $('#main'), asideBar = $('.aside-bar');
    var breadcrumb = main.find('.breadcrumb');
    var toolbar = $('#toolbar');
    var addbutton = toolbar.find('button:first-child');
    var table = $('#table');
    var preViewId = '';
    var _changeBread = function(step) {
        var bread = breadcrumb.find('a[step=' + step + ']');
        breadcrumb.find('.bread-active').removeClass('bread-active');
        if (bread.length) {
            bread.addClass('bread-active');
            return true;
        }
        return false;
    }

    addbutton.click(function() {
		var nextstep = $(this).attr('nextstep'); 
		preViewId = nextstep;
        api.hideTable();
        api.clearValues($(nextstep));
		$(nextstep).show();
	});

    var api =  {
        getParams: function (form, every) {
            var _params = {};
            form.children().each(function (index, item) {
                if (!every) {
                    // 如果是最后一项就不去遍历了
                    if (index == form.children().length - 1) {
                        return;
                    }
                }
                var widget = $(item).children(":last-child");
                var name = widget.attr('name');
                var value = widget.val();
                _params[name] = value;
            });
            return _params;
        },
        clearValues: function (form, every) {
            form.children().each(function (index, item) {
                if (!every) {
                    // 如果是最后一项就不去遍历了
                    if (index == form.children().length - 1) {
                        return;
                    }
                }
                var widget = $(item).children(":last-child");
                var value = widget.val("");
            });
        },
        setValues: function (form, params) {
            form.children().each(function (index, child) {
                var widget = $(child).children().last();
                for (var k in params) {
                    if (widget.attr('name') === k) {
                        widget.val(params[k]);
                    }
                }
            })
        },
        message: {
            success: function (text) {
                $('body').before(
                    '<div id="alert" class="alert alert-success" style="width: 400px; margin-left: -200px;top: 0;position:fixed;left: 50%; z-index: 999;transition: all .5s ease-in-out">' +
                    '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
                    '<strong>成功！</strong>' + text +
                    '</div>'
                );
                $("#alert").alert();
                setTimeout(() => {
                    $('#alert').css({
                        transform: 'translateY(100px)'
                    });
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 2000)
                }, 10);
            },
            error: function (text) {
                if ($('#alert').length) return;
                $('body').before(
                    '<div id="alert" class="alert alert-warning" style="width: 400px; margin-left: -200px;top: 0;position:fixed;left: 50%; z-index: 999;transition: all .5s ease-in-out">' +
                    '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
                    '<strong>警告！</strong>' + text +
                    '</div>'
                );
                $("#alert").alert();
                setTimeout(() => {
                    $('#alert').css({
                        transform: 'translateY(100px)'
                    });
                    setTimeout(function () {
                        $('#alert').remove();
                    }, 2000)
                }, 10);
            }
        },
        changeBread: function (step) {
            var bread = breadcrumb.find('a[step=' + step + ']');
            breadcrumb.find('.bread-active').removeClass('bread-active');
            if (bread.length) {
                bread.addClass('bread-active');
                return true;
            }
            return false;
        },
        // 显示table模块
        showTable: function () {
            table.parents('section').show();
        },

        // 隐藏table
        hideTable: function () {
            table.parents('section').hide();
        },

        // 刷新表
        refreshTable: function () {
            table.bootstrapTable('refresh');
        },
        initTable: function(name, events, queryParams, data) {
            var conf = config.table[name](events, queryParams, data);
		    table.bootstrapTable('destroy').bootstrapTable(conf);
        },
        insertBread: function(name, step, events) {
            var inserted = _changeBread(step);
            if (inserted) {
                return;
            }
            breadcrumb.append(
                "<li>" +
                        "<a href='#' class='bread-active' step=" + step + ">" + name + "</a>" +
                "</li>"	
            ); 
            breadcrumb.find('a').click(function() {
                var step = $(this).attr('step');
                var form = $(this).attr('form');
                addbutton.attr('nextstep', '#'+step+'Form');
                // 干掉后面的所有元素
                $(this).parent().nextAll().remove();
                _changeBread(step);
                $(preViewId).hide();
                api.initTable(step, events[step]);
                api.showTable();
            });
        },
        removeAllBread() {
            breadcrumb.children(':eq(0)').nextAll().remove();
        }
    }


    return api;
});