$(function () {
//    请求ajax数据获取购物车数据然后进行渲染
  function render() {
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        success: function (info) {
          console.log(info);
          //需要登录状态,如果未登录,需要跳转到登录页面,登录成功后跳转回来
          if (info.error === 400) {
            // 把本页面的链接拼接在新网站的后面
            location.href = "login.html?Url=" + location.href;
            return
          }
          var htmlStr = template('cartTpl', {list: info});
          $('#cartList').html(htmlStr);
          //停止刷新
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
        }
      })
    }, 500)
    
  }
  
  //配置下拉刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          render()
        }
      }
    }
  });

//  给每个删除按钮添加点击事件
  $('#cartList').on('tap', '.btn_delete', function () {
    //    获取对应的ID
    var id = $(this).data('id')
    // 发送ajax请求渲染页面
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      success: function (info) {
        console.log(info);
        if (info.success) {
          mui.confirm('你是否要删除这个物品', '温馨提示', ['否', '是'], function (e) {
            
            if (e.index === 1) {
              mui('#refreshContainer').pullRefresh().pulldownLoading()
            }
          })
        }
        
      }
    })
  })

//  给每个编辑按钮添加点击事件
  $('#cartList').on('tap', '.btn_edit', function () {
    //获取元素里自定义的data属性
    console.log(this.dataset);
    var htmlStr = template('editTpl', this.dataset)
    //把模板里默认的换行替换为空格
    htmlStr = htmlStr.replace(/\n/g, "");
    
    
    // 获取商品ID
    var id = this.dataset.id;
    console.log(id);
    mui.confirm(htmlStr, '编辑商品', ['确定', '取消'], function (e) {
      
      if (e.index === 0) {
        //获取修改后的数量
        var num = $('.lt_num input').val();
        //获取修改的尺码
        var size = $('.product_size span.current').text()
        
        //发送ajax请求
        $.ajax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (info) {
            console.log(info);
            if (info.success) {
              //重新刷新
              mui('#refreshContainer').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
    //配置减少增加按钮
    mui(".mui-numbox").numbox();
  })

//  给编辑详情的尺码添加点击事件
  $('body').on('click', '.product_size span', function () {
    $(this).addClass('current').siblings().removeClass('current');
  })


//  给复选框添加点击事件
  
  $('#cartList').on('click', '.btn_ck', function () {
    //声明一个变量总价格
    var totalPrice = 0;
    //获取选中的复选框数量
    var checkBox = $('#cartList .btn_ck:checked');
    console.log(checkBox);
    checkBox.forEach(function (v, i) {
      //获取当前复选框中的数量
      var dataNum = $(v).data('num')
      //获取当前复选框中的价格
      var dataPrice = $(v).data('price');
      // console.log(dataPrice);
      // console.log(dataNum);
      totalPrice += dataNum * dataPrice
    })
      //保留数据后两位
      totalPrice=totalPrice.toFixed(2)
    //渲染到页面中
    $('.totalPrice .price').text(totalPrice);
  })
  
  
})