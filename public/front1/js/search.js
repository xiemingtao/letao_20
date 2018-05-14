$(function () {
//设置一个假数据
//   var arr = ["阿迪", "耐克", "特步"]
//   localStorage.setItem('search_list', JSON.stringify(arr))


//  1 先从本地存储获取数据

//  将获取本地存储封装成函数
  function getHostory() {
    var datas = localStorage.getItem('search_list') || "[]"
    var arr = JSON.parse(datas)
    
    return arr;
  }
  
  //封装一个函数来渲染页面
  function render() {
    var arr = getHostory();
    var htmlStr = template('hostoryTpl', {arr: arr})
    
    $('.history').html(htmlStr)
  }

//  打开页面渲染数据
  render()

//  清空历史记录
  $('.history').on('click', '.btn_empty', function () {
    
    mui.confirm("你确认要清空所有历史记录么", "温馨提示", ["取消", "确认"], function (e) {
      // console.log(e);
      if (e.index === 1) {
        //删除本地存储的数据
        localStorage.removeItem('search_list');
        //重新渲染数据
        render()
      }
    })
    
    
  })

//  点击叉号,单个删除立即记录
  $('.history').on('click', '.delete_btn', function () {
    
    mui.confirm("你确认要删除当前历史记录么", "温馨提示", ["取消", "确认"], function (e) {
      
      if (e.index === 1) {
        //获取对应的索引值
        var index = $(this).data('id');
        //获取当前本地存储的数据
        var arr = getHostory();
        //根据索引值删除数组中对应的数据
        arr.splice(index, 1)
        //将删除后的数组重新添加到本地存储中
        localStorage.setItem('search_list', JSON.stringify(arr))
        //根据新数组重新渲染数据
        render()
      }
    }.bind(this))
  })


//  添加搜索历史
  $('.search_btn').click(function () {
    //    获取当前搜索框的内容
    var txt = $(this).prev().val()
    if (txt === "") {
      
      return
    }
    
    //  获取当前本地存储中数据
    var arr = getHostory();
    //如果之前搜索项有就删除之前数组里的数据
    if (arr.indexOf(txt) > -1) {
      arr.splice(arr.indexOf(txt), 1)
    }
    //如果搜索框超过10条数据就删除最老的一条
    if (arr.length >= 10) {
      arr.splice(-1, 1)
    }
    //将搜索框的内容添加到数组的最前面
    arr.unshift(txt)
    //  将新的数组添加到本地存储中
    localStorage.setItem('search_list', JSON.stringify(arr));
    //重新渲染
    render()
    $(this).prev().val('')
    
    location.href = "searchList.html?key=" + txt;
  })
  
//  给每个搜索记录绑定点击事件
  $('.history').on('click','.history .historyList ul li a',function () {
      var txt = $(this).text()
  
    location.href = "searchList.html?key=" + txt;
  })
})