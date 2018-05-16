$(function () {
//    请求ajax数据获取用户信息渲染
  $.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    success: function (info) {
      console.log(info);
      //未登录 跳转到登录页面
      if (info.error === 400) {
        location.href = "login.html";
      }
      // 获取信息成功 渲染数据
      var htmlStr = template('userTpl', info)
      $('#userInfo').prepend(htmlStr)
    }
  })


//  点击退出按钮退出登录
  $('.user_out button').click(function () {
    $.ajax({
      type: "get",
      url: '/user/logout',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })
  
})