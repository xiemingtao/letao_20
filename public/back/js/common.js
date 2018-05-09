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



