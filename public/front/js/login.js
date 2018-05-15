$(function () {
//点击登录按钮
//根据表单获取用户名和密码
//发送ajax请求后台获取数据验证用户密码.通过登录 失败重新登录并且弹出提示信息
  
  $('.btn_login').click(function () {
    //  获取用户和密码
    var username = $('.lt_main .username').val().trim();
    //  获取密码
    var password = $('.lt_main .password').val().trim();
    
    //  判断用户密码不能为空,如果为空弹出提示消息
    if (username === "") {
      mui.toast('请输入用户名');
      return
    }
    if (password === "") {
      mui.toast('请输入密码');
      return
    }
    
    //发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      success: function (info) {
        // console.log(info);
        //如果登录失败,弹出提示信息
        if (info.error === 403) {
          mui.toast(info.message)
        }
        //登录成功判断是否是拦截过来的,还是直接登录的
        if (info.success) {
          //如果查询到地址栏大于1说明是拦截过来登录的,登录承购需要跳转到原来的页面
          if (location.href.indexOf('Url') > -1) {
            var url = location.search.replace('?Url=', "")
            console.log(url);
            location.href = url;
          }
          else{
            //说明是首次登录 直接跳转到用户界面
            location.href = "user.html";
          }
        }
      }
    })
    
  })
  //查看地址栏的地址
  console.log(location.href);
  //查看地址栏?后面拼接的字符串
  console.log(location.search);
})