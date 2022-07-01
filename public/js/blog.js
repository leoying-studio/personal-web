$(document).ready(function () {
  var count =  $("#extendPagination").attr('count')
  $("#extendPagination").extendPagination({
    totalCount: count,
    showCount: 4,
    limit: 9,
    callback: function (curr, limit, totalCount) {
      window.location.href = "/blog/view?pageNo="+curr+"&pageSize=9"
    },
  });
});
