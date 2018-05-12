$(function () {
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: true, //是否竖向滚动
    indicators: true, //是否显示滚动条
    bounce: true //是否启用回弹
  });
  
  //进入页面渲染
  render(1)

//  请求ajax 获取一级分类渲染页面
  
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      // console.log(info);
      var htmlStr = template('navTpl', info);
      
      $('.lt_main_left ul').html(htmlStr)
    }
  })
  
  
  
//  给每个一级分类添加点击事件
  $('.lt_main_left').on('click', 'a', function () {
    //获取ID
    $('.lt_main_left a').removeClass('current')
    var id = $(this).data('id')
    $(this).addClass('current')
    render(id)
    
    
  })
  
  function render(id) {
    //    发送ajax请求根据一级分类id获取二级分类
    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      dataType: "json",
      data: {
        id: id
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('cateTpl', info);
        
        $('.lt_main_right ul').html(htmlStr)
      }
    })
  }
})