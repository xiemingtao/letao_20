//
// 进度条
//禁用进度环
NProgress.configure({showSpinner: false});
//开启进度条

$(document).ajaxStart(function () {
  NProgress.start()
})

//  关闭进度条
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  }, 500)
})


$(function () {
  // 菜单功能
  $('.icon_menu').click(function () {
    $('.lt_main').toggleClass('hideLeft');
    $('.lt_aside').toggleClass('hideLeft')
    $('.menu').toggleClass('hideLeft')
  })
  //二级分类
  $('.category').click(function () {
    $('.child').stop().slideToggle()
  })
  
  
})
/*
* ajax全局事件
* ajaxComplete  只要请求完成就调用
* ajaxError  请求失败时调用
* ajaxSend   请求发送时调用
* ajaxStart  开始发送时调用
* ajaxStop   停止时调用
* ajaxSuccess 请求成功时调用
*
*
*
*
* */
$(function () {
  //模态框显示
  $('.icon_logout').click(function () {
    $('#outModal').modal('show')
  })


//  退出
  $('.out_btn').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.success) {
          location.href = " login.html"
        }
      }
    })
  })

//  登录验证
  if (location.href.indexOf('login.html') == -1) {
    $.ajax({
      url: '/employee/checkRootLogin',
      type: 'get',
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.error === 400) {
          location.href = "login.html"
        }
      }
    })
  }
  
  
})
