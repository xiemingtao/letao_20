//禁用进度条
NProgress.configure({showSpinner: false});


/*ajax全局事件
*
* ajaxComplete  只要请求完成就调用
* ajaxError  请求失败时调用
* ajaxSend   请求发送时调用
* ajaxStart  开始发送时调用
* ajaxStop   停止时调用
* ajaxSuccess 请求成功时调用
*
* */
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
})

$(document).ajaxStop(function () {
  //关闭进度条
  setTimeout(function () {
    NProgress.done();
  }, 500)
})

$(function () {
//    公共的二级菜单切换功能
  $('.category').click(function () {
    $('.lt_aside .child').stop().slideToggle();
  })

//2
  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })
  //3
  $('.icon_logout').click(function () {
    $('#logouModal').modal('show')
  })
  //4
  $('#logout_btn').click(function () {
    //    需要调用退出接口销毁登录状态
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: '/employee/employeeLogout',
      success: function (info) {
        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })


//  5 登录拦截分析
  
  if (location.href.indexOf('login.html') === -1) {
    //  如果没有login.html 需要判断当前用户状态
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success === 400) {
          location.href = "login.html"
        }
      }
    })
  }
  
})



