//进度条

//禁用进度圈
NProgress.configure({showSpinner: false});

//ajax请求开始时开启进度条
$(document).ajaxStart(function () {
  NProgress.start()
})
//ajax请求结束时关闭进度条
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  }, 500)
})


$(function () {
  // console.log($('.lt_main'));
//点击菜单栏隐藏或者出现侧边栏
  $('.icon_menu').click(function () {
    $('.lt_main').toggleClass('hideLeft')
    $('.menu').toggleClass('hideLeft')
    $('.lt_aside').toggleClass('hideLeft')
  })
  
  //切换二级菜单
  $('.category').click(function () {
    $('.child').stop().slideToggle()
  })
//  显示模态框
  $('.icon_out').click(function () {
    $('.modal').modal('show')
  })
  
  //退出登录
  $('.logout_btn').click(function () {
    $.ajax({
      url: '/employee/employeeLogout',
      type: "get",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })
})


$(function () {
//    判断登录状态
  if (location.href.indexOf('login.html') == -1) {
    $.ajax({
      url: '/employee/checkRootLogin',
      type: 'get',
      success: function (info) {
        console.log(info);
        if (info.error == 400) {
          location.href = "login.html"
        }
      }
    })
  }
  
})