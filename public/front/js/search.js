$(function () {

//  1.先获取本地存储中搜索数据
  // 因为得到的数据是json字符串需要转换为复杂类型数据
  function getHistory() {
    var arr = JSON.parse(localStorage.getItem('search_list') || "[]");
    
    return arr
  }
  
  //将渲染数据封装成函数来重复调用
  function render() {
    var arr = getHistory();
    
    var htmlStr = template('searchTpl', {arr: arr});
    $('.lt_history').html(htmlStr)
  }
  
  render()
  
  
  // 2清空历史记录点击事件
  $('.lt_history').on('click', '.lt_history .history_title .btn_empty', function () {
    //获取数据
    mui.confirm('你确定要删除当前搜索历史吗?', '温馨提示', ['取消', '确认'],function (e) {
      // console.log(e);
      if(e.index===1){
        localStorage.removeItem('search_list');
        getHistory()
        render()
      }
    })
  
    
    
  })

//  单个删除历史记录事件
  $('.lt_history').on('click', '.lt_history .history_list .btn_del', function () {
    mui.confirm('你确定要删除当前搜索历史吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        // 获取对应的索引值
        var index = $(this).prev().data('index')
        //  获取本地存储中的数据
        var arr = getHistory()
        //根据索引值删除对应的数据
        arr.splice(index, 1)
        // console.log(arr);
        //将更新后的数据存入本地存储中
        localStorage.setItem('search_list', JSON.stringify(arr));
        //重新渲染数据
        render()
      }
      
    }.bind(this))
    
    
  })
//  点击搜索添加到搜索记录中
  $('.btn_search').click(function () {
    //    获取文本框中的内容
    var txt = $('.lt_search input').val();
    //获取本地存储中的内容
    var arr = getHistory();
    //如果文本内容为空停止
    if (txt === "") {
      return
    }
    //如果文本内容数组中有将删除数组对应的数据
    if (arr.indexOf(txt) > -1) {
      arr.splice(arr.indexOf(txt), 1)
    }
    //如果数组长达大于10删除最老的一项数据
    if (arr.length >= 10) {
      arr.pop()
    }
    //将文本内容添加到数组最前面
    arr.unshift(txt);
    //将新数据添加到本地存储中
    localStorage.setItem('search_list', JSON.stringify(arr))
    //重新渲染
    render()
    //重置文本内容
    $('.lt_search input').val("")
    
    location.href = "searchList.html?key=" + txt;
  })

//  给搜索列表添加点击事件
  $('.lt_history').on('click', '.lt_history .history_list ul a', function () {
    var txt = $(this).text()
    console.log(txt);
    location.href = "searchList.html?key=" + txt;
  })
})