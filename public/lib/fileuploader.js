;(function($) {
    $.fn.extend({
        uploader: function(options) {
            var uploadUrl = options.url;
            var success =  options.success;
            var el = $(this)
            // 渲染节点视图
            var renderView = function() {
               var boxStyle = {
                    width: "178px",
                    height: "178px",
                    border: "1px dashed #d9d9d9",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: 'center',
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
               var input = $("<input type='file'/>").css(inputStyle)
               var icon = $("<i class='icon iconfont icon-upload'></i>").css(iconStyle)

               el.append(input)
               el.append(icon)
            }

            el.children().remove();
            renderView()


            var toFormData = function(files) {
                var file = files[0];
                var formData = new FormData();
                formData.append('image', file);
                return formData;  
            }

            var refreshView = function(path) {
                var origin = document.location.origin;
                var src = origin + "/" + path
                var i = el.children("i");
                if (i) {
                  i.remove();
                }
                var img = el.children("img")
                if (img.length) {
                   img[0].attr({
                     src
                   })

                   return
                } 
                 var img = $("<img />").css({
                   width: "100%",
                   height: "100%"
                 }).attr({
                   src
                 })
                 el.append(img)
                 el.children('input').value = null;
                 return src;
            }

            var upload = function(formData) {
                $.ajax({
                    url: uploadUrl,
                    type: "POST",
                    data: formData,
                    processData: false, //  告诉jquery不要处理发送的数据
                    contentType: false, // 告诉jquery不要设置content-Type请求头
                    success: function (res) {
                        var src = refreshView(res.data)
                        success &&  success(res.data, src)
                    }
                  });
            }

            // 事件处理
            el.children('input').on('change', function(e) {
                var files = e.target.files;
                var formData = toFormData(files)
                upload(formData)
            }) 
        }
    });
})(jQuery);