;(function($) {
    $.fn.extend({
        selectorTree: function(dataSource) {
            var DATA_ANC = "data-ancestral";
            var DATA_TREEVALUE = "data-treevalue";
            var DATA_TREELABEL = "data-treelabel";
            var selectorValue = null;

            var setAttr = function(ancestralId, value, label) {
                var attr = {};
                attr[DATA_ANC] = ancestralId
                attr[DATA_TREEVALUE] = value
                attr[DATA_TREELABEL] = label
                return attr
            }
            /**
             * 
             * @param {*} children 列表数据
             * @param {*} parentId 上一次的父节点数据
             * @returns fn
             */
            var renderTree = function(children, parentId) {
                var elems = []
                $.each(children, function(index, item) {
                     var li =$("<li class='dropdown-item' style='position:relative;'>" + item.label + "</li>")
                     var ancestralId = parentId || Math.random().toString(32);
                     if (item.children && item.children.length) {
                        var childrenNode = renderTree(item.children, ancestralId )
                        childrenNode.attr(setAttr(ancestralId, item.value, item.label))
                        childrenNode.css({"position": "absolute", top: 0, left: '160px'})
                        li.append("<i class='icon iconfont icon-arrow-right-filling' style='font-size: 12px'></i>")
                        li.append(childrenNode);
                     }
                     li.attr(setAttr(ancestralId, item.value, item.label))
                     elems.push(li);
                })
                var panelChildren = $("<ul class='dropdown-menu'></ul>")
                $.each(elems, function(index, item) {
                    panelChildren.append(item);
                })
                return panelChildren;
            }

            /**
             *  完成节点的组装
             */
            var el = $(this).css({position: 'relative'})
            el.children().remove();
            var tree = renderTree(dataSource)
            var inputBox = $(
                "<div style='position:relative;'><input class='form-control' placeholder='请选择'/><i class='icon iconfont icon-close' style='position: absolute; right: 10px;top: 12px;'></i></div>"
            )

            var clear = function() {
                tree.hide().find('ul').hide()
                inputBox.children('input').val("");
                selectorValue = null
            }

            el.append(inputBox)
            tree.addClass('mt-2')
            el.append(tree)
            // 完成事件监听
            el.children('div').click(function(e) {
                if (e.target.tagName == 'INPUT') {
                    el.children('ul').show()
                } else if (e.target.tagName == 'I'){
                    clear()
                }
            })
            var preElement = null
            tree.find('li').mouseenter(function(e) {
                var target = $(e.target);
                var ul = target.children("ul")
                // 同一个祖先
                if (preElement) {
                    var preElementAncestral =  preElement.attr(DATA_ANC)
                    var targetAncestral = target.attr(DATA_ANC)
                    var isAncestral = preElementAncestral === targetAncestral
                    if (!isAncestral) {
                        preElement.hide().parents('ul[data-ancestral]').hide()
                    }
                }
                if (ul.length) {
                    preElement = ul
                    ul.show().find('ul').hide()
                }
            })

            tree.mouseleave(function(e) {
                $(this).hide().find('ul').hide()
            })

            tree.click(function(e) {
                if (e.target.tagName === 'LI') {
                    tree.hide().find('ul').hide()
                    const target = $(e.target)
                    selectorValue = target.attr(DATA_TREEVALUE)
                    var text = target.attr(DATA_TREELABEL)
                    inputBox.children('input').val(text)
                } 
            })

            return {
                getValue: function() {
                    return selectorValue
                },
                clear
            }
        }
    });
})(jQuery);