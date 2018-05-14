$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  
  
  
//  发送ajax请求数据渲染一级分类导航
  $.ajax({
    url:"/category/queryTopCategory",
    type:"get",
    success:function (info) {
      // console.log(info);
      var htmlStr = template('firstTpl',info);
      $('.lt_product_left ul').html(htmlStr)
      
      render(info.rows[0].id)
    }
  })
  
//  2点击一级分类显示对应的品牌鞋子
  $('.lt_product_left ul').on('click','a',function () {
  //    获取对象的ID
    var id = $(this).data('id')
    
    $('.lt_product_left a').removeClass('current')
    $(this).addClass('current')
    
   render(id)
   
  })
  
//  封装一个函数
  function  render(id) {
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:{
        id:id
      },
      success:function (info) {
        console.log(info);
        var htmlStr = template('secondTpl',info)
      
        $('.lt_product_right ul').html(htmlStr)
      
      }
    })
  }
  // 进入页面时 直接渲染第一个
  
})