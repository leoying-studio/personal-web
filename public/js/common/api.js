define([
    'require',
    'jquery'
], function(require, $) {
    return {
        getParams: function(form, every) {
            var _params = {};
            form.children().each(function(index, item) {
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
        clearValues: function(form, every) {
            form.children().each(function(index, item) {
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
        setValues: function(form, params) {
            form.children().each(function(index, child) {
                var widget = $(child).children().last();
                for(var k in params) {
                    if (widget.attr('name') === k) {
                        widget.val(params[k]);
                    }
                }
            })
        },
        message: {
            success: function(text) {
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
                    setTimeout(function() {
                        $('#alert').remove();
                    }, 2000)
                }, 10);
            },
            error: function(text) {
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
                    setTimeout(function() {
                        $('#alert').remove();
                    }, 2000)
                }, 10);
            }
        }
    } 
});