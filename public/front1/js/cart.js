$(function () {
//    发送ajax请求获取购物车商品信息
  
  //封装成一个函数
  
  
  function render() {
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        success: function (info) {
          console.log(info);
          if (info.error == 400) {
            location.href = 'login.html?Url=' + location.href;
          }
          //  获取到数据渲染模板
          var htmlStr = template("cartListTpl", {list: info});
          
          $('.big_box').html(htmlStr)
          
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          console.log(mui('#refreshContainer').pullRefresh());
        }
      })
    }, 500)
    
  }

//  配置下拉刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          render()
          
          
        }
      }
    }
  });

//  3删除功能
  $('.big_box').on('tap', '.btn-del', function () {
    
    var id = $(this).data('id')
    // console.log(id);
    mui.confirm('你是否要删除这个商品', '温馨提示', ['否', '是'], function (e) {
      
      if (e.index === 1) {
        $.ajax({
          url: "/cart/deleteCart",
          type: 'get',
          data: {
            id: [id]
          },
          success: function (info) {
            // console.log(info);
            if (info.success) {
              // s删除成功渲染页面
              mui('#refreshContainer').pullRefresh().pulldownLoading()
            }
          }
        })
      }
    })
  });


// 编辑功能
//  点击编辑功能弹出模态框选择数据然后点击确认 渲染数据
//  根据后台接口我们需要产品id size  num
//  演出模态框我们需要产品的详情 所以需要产品在渲染的时候携带这些
  
  $('.big_box').on('tap', '.btn-edit', function () {

//    获取数据
    var info = this.dataset
    var id = info.id;
    console.log(id);
    console.log(info);
//显示模态框
    
    var htmlStr = template('editTpl', info)
    //配置数字输入框
    //替换/n
    htmlStr = htmlStr.replace(/\n/g, "")
    mui.confirm(htmlStr, '编辑商品', ['确定', '取消'], function (e) {
      if (e.index === 0) {
        //获取编辑后的尺码和数量
        var size = $('.product_size span.current').text();
        var num = $('.mui-numbox [type="number"]').val()
        $.ajax({
          url: '/cart/updateCart',
          type: 'post',
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (info) {
            console.log(info);
            if (info.success) {
              mui('#refreshContainer').pullRefresh().pulldownLoading()
            }
          }
        })
      }
    })
    mui('.mui-numbox').numbox()
  })
  
  // 5给模态框上的尺寸添加点击事件
  $('body').on('click', '.product_size span', function () {
    $(this).addClass('current').siblings().removeClass('current')
  })


//  6动态的渲染订单总金额
  $('.big_box').on('click', '.btn_ck', function () {
//    获取选中复选框的个数
    var checks = $('.btn_ck:checked')
    
    var num = $(this).data('num');
    var price = $(this).data('price');
    var total = 0;
    total += num * price;
    total = total.toFixed(2)
    $('.totalprice').text(total)
  })
})