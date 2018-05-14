$(function () {
  var key = getSearchKey('key')
  //将获取到的之值渲染到搜索框中
  $('.search input').val(key)
  render()
  
  function render() {
    $('.product').html('<div class="loadding"></div>')
    //定义一个空对象 将接口文档所需的数据放入对象中
    var obj = {};
    //接口必须要的3个数据
    obj.proName = $('.search input').val();
    obj.page = 1;
    obj.pageSize = 100;
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
          // console.log(info.data[0].pic[0].picAddr);
          var htmlStr = template('listTpl', info)
          $('.product').html(htmlStr)
        }
      })
    },500)
   
  }
  
  //点击搜索按钮
  $('.search button').click(function () {
    render()
    
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
  
//  点击排序按钮进行商品排序
  $('.lt_sort a[data-type]').click(function () {
      // 先排他点击高亮
    
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      //没有current类名
      $(this).addClass('current').siblings().removeClass('current');
    //  其他的重置成箭头向下
      $(this).siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up')
    }
    
    render()
  })
})