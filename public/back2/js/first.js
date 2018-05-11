


$(function () {
//    发送请求 获取数据 渲染页面
  
  var currentPage =1;
  var currentSize = 5;
  
  
  
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:currentPage,
      pageSize:currentSize
    },
    success:function (info) {
      console.log(info);
      
      
      var htmlStr = template('template',info)
      
    //  渲染页面
      
      $('.lt_main tbody').html(htmlStr)
    }
  })
  
  
})