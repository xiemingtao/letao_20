$(function () {
  var id = getSearch('productId')
  
  //发送ajax请求数据获取商品详情 渲染数据
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: id
    },
    success: function (info) {
      console.log(info);
      var htmlStr = template('productTpl', info);
      // console.log(htmlStr);
      $('.mui-scroll').html(htmlStr)
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      
      // 手动初始化 输入框
      mui(".mui-numbox").numbox();
      
    }
  })


//给每个尺寸添加点击事件
  $('.lt_main').on('click', '.product_size span', function () {
    $(this).addClass('current').siblings().removeClass('current');
  })


//  店家添加购物车点击事件
  $('.add_btn').click(function () {
    //   获取尺寸
    var size = $('.product_size span.current').text();
    //如果没选择size 取值为null 取反做判断
    if (!size) {
      mui.toast('请选择尺码')
      return
    }
    //  获取当前数量
    var num = $('.product_num input').val();
    
    //  发送ajax请求
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function (info) {
        console.log(info);
        if (info.success) {
          //  如果添加成功,跳出模态框,提示跳转购物车或者继续浏览
          mui.confirm('添加成功', "温馨提示", ['去购物车', '继续浏览'], function (e) {
            console.log(e);
            if (e.index === 0) {
              //  跳转到购物车页面
              location.href = "cart.html"
            }
          })
        }
        //未登录 需要跳转到登录框,登录成功然后跳回原页面
        if (info.error === 400) {
          // location.href等于本页面
          location.href = "login.html?Url=" + location.href;
        }
        
        
      }
    })
  })
  
})