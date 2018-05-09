//
// 进度条
//禁用进度环
NProgress.configure({ showSpinner: false });
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
