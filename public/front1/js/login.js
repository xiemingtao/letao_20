$(function () {
//    发送ajax请求获取用户信息登录
  
  $('.btn_login').click(function () {
    // 根据表单获取用户输入的用户名和密码
    var username = $('#username').val().trim();
    if (username === "") {
      mui.toast('请输入用户名');
      return
    }
    var password = $('#password').val().trim();
    if (password === "") {
      mui.toast('请输入密码')
      return;
    }
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      success: function (info) {
        // 登录失败弹出提示信息
        if (info.error === 403) {
          mui.toast(info.message)
        }
        //登录成功获取地址栏信息判断是拦截跳转过来的还是首次登录来的
        if (info.success) {
          //拦截过来登录的
          if (location.href.indexOf('Url') > -1) {
            
            location.href = location.search.replace('?Url=', '');
          }else{
            // 直接登录到用户页面
            location.href ="user.html"
          }
        }
      }
    })
    
  })
  
  console.log(location.search);
  console.log(location.search.replace('?Url=', ''));
})