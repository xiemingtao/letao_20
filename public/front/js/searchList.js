$(function () {
//    获取地址栏中的数据放入搜索框中
  $('.lt_search input').val(getSearch('key'))
  
  render()
  
  function render() {
    $('.lt_product').html('<div class="loadding"></div>')
    //定义一个对象
    var obj = {};
    //三个必须的参数
    obj.proName = $('.lt_search input').val();
    obj.page = 1;
    obj.pageSize = 100;
    //两个非必须参数 price num  1升序，2降序
    var $current = $('.lt_sort a.current');
    // console.log($current);
    if ($current.length > 0) { //说明有这个类
      // console.log($current);
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
          // console.log(info);
          var htmlStr = template('productTpl', info);
      
          $('.lt_product ').html(htmlStr)
        }
      })
    },500)
   
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
    
    render()
    
    $('.lt_search input').val('')
  })
  
//  给升序按钮添加点击事件
  $('.lt_sort a[data-type]').click(function () {
     //有类名 .点击切换升序或者降序改变箭头方向
     if($(this).hasClass('current')){
       $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
     }else{
     //  没有current类 排他 当前高亮
       $(this).addClass('current').siblings().removeClass('current')
     // 重置小箭头
       $(this).siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up')
     }
     render()
  })
  
})