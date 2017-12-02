function backHome() {
    window.location.href = "http://localhost:3000";
}

$(document).ready(function() {
     $('.nav-name').click(function() {
         debugger;
         var navId = $(this).attr('navid');
         var categories = $(this).attr('categories');
         var category = JSON.parse(categories)[0]._id;
         window.location.href=window.location.origin+"/article/view/"+navId+"/"+category
     });
});
