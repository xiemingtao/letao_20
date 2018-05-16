$(function () {
  var key = getSearchKey('key')
  //将获取到的之值渲染到搜索框中
  $('.search input').val(key)
  
  
  // 声明页码
  var currentPage = 1;
  var currentPageSize = 2;
  
  function render(callback) {
    // $('.product').html('<div class="loadding"></div>')
    //定义一个空对象 将接口文档所需的数据放入对象中
    var obj = {};
    //接口必须要的3个数据
    obj.proName = $('.search input').val();
    obj.page = currentPage;
    obj.pageSize = currentPageSize;
    //2个非必须的数据 price num （1升序，2降序）
    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      var sortName = $current.data('type')
      var sortType = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
    }
    obj[sortName] = sortType;
    setTimeout(function () {
      
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: obj,
        success: function (info) {
          // console.log(info);
         callback(info)
        }
      })
    }, 500)
    
  }
  
  // 点击搜索按钮
  $('.search button').click(function () {
    //启用下拉刷新
    mui('#refreshContainer').pullRefresh().pulldownLoading();
    
    //  获取搜索关键字
    var txt = $('.search input').val()
    if (txt === "") {
      return;
    }
    //  获取本地存储数据
    var history = localStorage.getItem('search_list') || "[]";
    //  将数据转换为数组
    var arr = JSON.parse(history);

    //判断本地存储中是否有搜索关键字
    var index = arr.indexOf(txt);
    if (index > -1) {
      arr.splice(index, 1)
    }
    if (arr.length >= 10) {
      arr.pop()
    }
    //将搜索关键字添加到数组前面
    arr.unshift(txt);
    
    //  将新的数组转换为JSON字符串存到本地存储中
    localStorage.setItem('search_list', JSON.stringify(arr))
  })

 // 点击排序按钮进行商品排序
  $('.lt_sort a[data-type]').click(function () {
    // 先排他点击高亮

    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    } else {
      //没有current类名
      $(this).addClass('current').siblings().removeClass('current');
      //  其他的重置成箭头向下
      $(this).siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up')
    }
    //启用下拉刷新
    mui('#refreshContainer').pullRefresh().pulldownLoading();
  })


//  点击商品进行网页跳转进行
  $('.product').on('click', '.product_item', function () {
    var id = $(this).data('id');
    console.log(id);
    location.href = "product.html?productId=" + id;
  })


//  配置下拉刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        
        callback: function () {
          currentPage = 1;
          render(function (info) {
            // console.log(info.data[0].pic[0].picAddr);
            var htmlStr = template('listTpl', info)
            $('.product').html(htmlStr)
            //获取到数据关闭下拉刷新状态
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
  
            // 下拉刷新完成后, 因为进行了重新渲染, 需要重新启用上拉加载功能
            mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
          })
        }
       
      },
      up: {
        // height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: false,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          currentPage++;
          
          render(function (info) {
            console.log(info);
            //如果下拉的数据中没有数据就直接显示没有更多诗句
            if (info.data.length > 0) {
              //这里是还有数据显示加载更多
              var htmlStr = template('listTpl', info);
          
              $('.product ').append(htmlStr)
              //结束上拉加载传显示加载更多
              mui('#refreshContainer').pullRefresh().endPullupToRefresh();
            }else{
              //终止上拉加载传true显示没有更多数据
              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
            }
        
          })
        }
      }
    }
  });
})