define([
    'require',
    'jquery',
    'config'
], function (require, $, config) {
    var main = $('#main'),
        asideBar = $('.aside-bar');
    var breadcrumb = main.find('.breadcrumb');
    var toolbar = $('#toolbar');
    var commDrop = $('#common-dropdown');
    var addbutton = commDrop.find('button:first-child');
    var table = $('#table');
    var preViewId = '';
    var _changeBread = function (step) {
        var bread = breadcrumb.find('a[step=' + step + ']');
        breadcrumb.find('.bread-active').removeClass('bread-active');
        if (bread.length) {
            bread.addClass('bread-active');
            return true;
        }
        return false;
    }

    addbutton.click(function () {
        if ($(this).attr('class').indexOf('disabled') > -1) {
            return;
        }
        var nextstep = $(this).attr('nextstep');
        preViewId = nextstep;
        api.hideTable();
        api.clearValues($(nextstep));
        $(nextstep).show();
    });
    var api = {
        getParams: function (form, every) {
            var _params = {};
            form.children().each(function (index, item) {
                item = $(item);
                if (!every) {
                    // 如果是最后一项就不去遍历了
                    if (index == form.children().length - 1) {
                        return;
                    }
                }
                if (item.hasClass("checkbox-item")) {
                    var boxs = item.find("input[type='checkbox']");
                    var values = [];
                    var name = "";
                    boxs.each(function (index, widget) {
                        name = $(widget).attr("name");
                        values.push($(widget).val());
                    });
                    _params[name] = values;
                    return;
                }
                if (item.hasClass("radio-item")) {
                    var radio = item.find("input[type=radio]:checked");
                    var name = radio.attr("name");
                    _params[name] = radio.value;
                    return;
                }
                var widget = item.children(":last-child");
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
                child = $(child);
                var widget = null,
                    widgetType = "common";
                if (child.hasClass("checkbox-item")) {
                    widgetType = "checkbox";
                    widget = child.find("input[type='checkbox']");
                } else if (child.hasClass("radio-item")) {
                    widgetType = "radio";
                    widget = child.find("input[type=radio]");
                } else {
                    widget = $(child).children().last();
                }
                for (var k in params) {
                    if (widgetType == "checkbox") {
                        if (widget.first().attr("name") == k) {
                            widget.each(function (i, w) {
                                $(params[k]).each(function (p, param) {
                                    if ($(w).val() == param.id) {
                                        $(w).attr("checked", true);
                                    }
                                });
                            });
                        }
                    } else if (widgetType == "radio") {
                        if (widget.first().attr("name") == k) {
                            widget.each(function (i, w) {
                                debugger;
                                if (params[k].toString() == $(w).val()) {
                                    $(w).attr("checked", true);
                                }
                            });
                        }
                    } else if(widget.attr('name') === k) {
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
            table.parents('.bootstrap-table').show();
        },
        // 隐藏table
        hideTable: function () {
            table.parents('.bootstrap-table').hide();
        },
        // 刷新表
        refreshTable: function () {
            table.bootstrapTable('refresh');
        },
        initTable: function (name, events, options, params) {
            var type = Object.prototype.toString.call(params);
            var paramStrify = '';
            if (type === '[object Object]') {
                for (var k in params) {
                    paramStrify += '&' + k + '=' + params[k];
                }
                paramStrify = paramStrify.replace(/&/, '?');
            } else {
                paramStrify = params;
            }
            var conf = config.table[name](events, options, paramStrify);
            table.bootstrapTable('destroy').bootstrapTable(conf);
        },
        insertBread: function (name, step, events) {
            var inserted = _changeBread(step);
            if (inserted) {
                return;
            }
            breadcrumb.append(
                "<li>" +
                "<a href='#' class='bread-active' step=" + step + ">" + name + "</a>" +
                "</li>"
            );
            breadcrumb.find('a').click(function () {
                var step = $(this).attr('step');
                var form = $(this).attr('form');
                addbutton.attr('nextstep', '#' + step + 'Form');
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