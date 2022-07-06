$(document).ready(function () {
  var LIMIT = 9;
  var count =  $("#extendPagination").attr('count');
  var currentPage =  $("#extendPagination").attr('pageno')
  var numberOfPages = Math.floor(count / LIMIT);
  $("#extendPagination").bootstrapPaginator({
    totalPages: count,
    currentPage,
    numberOfPages,
    onPageClicked: function (e,originalEvent,type,page) {
      window.location.href = "/blog/view?pageNo="+page+"&pageSize=9"
    },
  });
});
