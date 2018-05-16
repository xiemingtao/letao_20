$(function () {
  //请求ajax数据获取产品详情,然后渲染页面
  //根据地址栏获取对应的产品的ID
  var id = getSearchKey('productId');
  
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (info) {
      console.log(info);
      console.log(info.pic[0].picAddr);
      //  使用模板渲染数据
      var htmlStr = template('productTpl', info)
      $('.big_box').html(htmlStr)
      
      //图片轮播初始化
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //点击增加数字
      mui('.mui-numbox').numbox()
    }
  })

//  给每个尺码添加点击事件
  $('.lt_main').on('click', '.product_size span', function () {
    $(this).addClass('current').siblings().removeClass('current')
  })
//  给添加购物车添加点击按钮
  $('.btn_cart').click(function () {
    //    获取当前商品的尺寸
    var size = $('.product_size span.current').text()
    if (!size) {
      mui.toast('请选择尺寸')
      return
    }
    //  获取当前商品的数量
    var num = $('.product_num input').val()
    //    发送ajax请求
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        id: id,
        size: size,
        num: num
      },
      success: function (info) {
        console.log(info);
        //未登录需要跳转到登录页面然后返回该页面
        if (info.error === 400) {
          location.href = "login.html?Url=" + location.href;
        }
        //如果登录成功弹出模态框提示是去购物车还是继续浏览
        if (info.success) {
          mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
            //跳转到购物车
            if (e.index === 0) {
              location.href = "cart.html";
            }
          })
        }
      }
    })
  })
  
})