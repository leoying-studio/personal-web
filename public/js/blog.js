$(document).ready(function () {
  var count =  $("#extendPagination").attr('count');
  var currentPage =  $("#extendPagination").attr('pageno')
  $("#extendPagination").bootstrapPaginator({
    totalPages: count,
    currentPage,
    numberOfPages: 4,
    onPageClicked: function (e,originalEvent,type,page) {
      window.location.href = "/blog/view?pageNo="+page+"&pageSize=9"
    },
  });
});
