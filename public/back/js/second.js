$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render()
  
  function render() {
    //通过ajax请求数据然后渲染到页面中
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        var htmlStr = template('secondTpl',info);
        // console.log(info);
        $('.lt_main tbody').html(htmlStr);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
          onPageClicked:function (a,b,c,page) {
              currentPage = page;
              render()
          }
        })
        
      }
    })
  }
  
  $('.add_btn').click(function () {
      $('#secondModal').modal('show')
  })
  
//  获取一级分类
  $('.add_btn').click(function () {
    $.ajax({
      type:"get",
      url:'/category/queryTopCategoryPaging',
      dataType:"json",
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        console.log(info);
        var htmlStr = template('firstTpl',info);
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })
 $('#form').serialize()
})