


$(function () {
//    发送请求 获取数据 渲染页面
  
  var currentPage =1;
  var currentSize = 5;
  render()
  function render() {
   
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
      
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          //当前页
          currentPage:  info.page,
        
          //总页数
          totalPages:Math.ceil(info.total / info.size),
        
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
          
            render()
          }
        
        
        })
      
      }
    })
  }
  
  $('.btn_cate').click(function () {
      $('#cateModal').modal('show')
  })
  $('.btn_add').click(function () {
    
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      success:function (info) {
        console.log(info);
        if(info.success){
          $('#cateModal').modal('hide')
          currentPage =1;
          render()
        }
      }
    })
  })
  
})