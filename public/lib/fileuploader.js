;(function($) {
    $.fn.extend({
        uploader: function() {
            var el = $(this)
            // 渲染节点视图
            var renderView = function() {
               var boxStyle = {
                    width: "178px",
                    height: "178px",
                    border: "1px dashed #d9d9d9",
                    borderRadius: "6px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
               }

               var inputStyle = {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
               }

               var iconStyle = {
                    fontSize: "28px",
                    color: "#8c939d",
                    width: "178px",
                    height: "178px",
                    lineHeight: "178px",
                    textAlign: "center"
                }

               el.css(boxStyle)
               var input = ("<input type='file'/>").css(inputStyle)
               var icon = ("<i class='icon iconfont icon-upload'></i>").css(iconStyle)

               el.append(input)
               el.append(icon)
            }

            el.children().remove();
            renderView()
        }
    });
})(jQuery);