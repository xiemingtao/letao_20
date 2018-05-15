
$(function () {
//    发送ajax请求获取数据渲染页面
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function (info) {
      console.log(info);
      var htmlStr = template('userTpl',info);
      $('.mui-scroll-wrapper #userInfo').html(htmlStr)
      
    }
  })
  
//  点击退出按钮 跳转到登录页面
  $('.btn_logout button').click(function () {
      $.ajax({
        type:"get",
        url:'/user/logout',
        success:function (info) {
          console.log(info);
          //退出成功跳转到登录页面
          if(info.success){
            location.href = "login.html"
          }
        }
      })
  })
})