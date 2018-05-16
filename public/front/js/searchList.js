$(function () {
//    获取地址栏中的数据放入搜索框中
  $('.lt_search input').val(getSearch('key'))
//
//   render()
//  标记当前页面
  var currentPage = 1;
  //标记当前页面数量
  var currentPageSize = 2;
  
  function render(callback) {
    // $('.lt_product').html('<div class="loadding"></div>')
    //定义一个对象
    var obj = {};
    //三个必须的参数
    obj.proName = $('.lt_search input').val();
    obj.page = currentPage;
    obj.pageSize = currentPageSize;
    //两个非必须参数 price num  1升序，2降序
    // 找有current类的元素
    var $current = $('.lt_sort a.current');
    // console.log($current);
    if ($current.length > 0) { //说明有这个类
      // console.log($current);
      //根据自定义属性type判断是price或者num
      var sortName = $current.data('type')
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      
    }
    obj[sortName] = sortValue;
    // console.log(obj);
    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        type: "get",
        data: obj,
        success: function (info) {
          callback(info)
        }
      })
    }, 500)
    
  }

//  点击搜索按钮事件
  $('.btn_search').click(function () {
    var txt = $('.lt_search input').val();
    
    var data = localStorage.getItem('search_list') || "[]";
    var arr = JSON.parse(data)
    if (txt === "") {
      return
    }
    if (arr.indexOf(txt) > -1) {
      arr.splice(arr.indexOf(txt), 1)
    }
    if (arr.length >= 10) {
      arr.pop()
    }
    arr.unshift(txt)
    
    localStorage.setItem('search_list', JSON.stringify(arr))
  
    mui('#refreshContainer').pullRefresh().pulldownLoading()
    
    // history.pushState && history.pushState({}, null ,"?key="+txt);
    
    // $('.lt_search input').val('')
  })

//  给升序按钮添加点击事件
//  给有自定义属性data-type的元素添加点击事件
  $('.lt_sort a[data-type]').on('tap',function () {
    //有类名 .点击切换升序或者降序改变箭头方向
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      //  没有current类 排他 当前高亮
      $(this).addClass('current').siblings().removeClass('current')
      // 重置小箭头
      $(this).siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up')
    }
    mui('#refreshContainer').pullRefresh().pulldownLoading()
  })

//  下拉刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        // height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        // contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        // contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        // contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          currentPage = 1;
          render(function (info) {
            console.log(info);
            var htmlStr = template('productTpl', info);
            
            $('.lt_product ').html(htmlStr)
            // 下拉刷新结束
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            
          //  重新启用上拉加载
            mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
          })
        }
      },
      //上拉加载
      up: {
        // height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: false,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          currentPage++;
          render(function (info) {
            console.log(info);
            if (info.data.length > 0) {
              var htmlStr = template('productTpl', info);
  
              $('.lt_product ').append(htmlStr)
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