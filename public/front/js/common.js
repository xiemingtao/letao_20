


$(function () {
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators:false,
    bounce:true
  });
  
//  轮播图初始化
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})

function getSearch(key) {
  var data = location.search;
  var obj = {}
  
  data = decodeURI(data)
  
  data = data.slice(1)
  var arr = data.split("&");
  
  arr.forEach(function (ele,index) {
    var v = ele.split("=")
    
    obj[v[0]] = v[1]
  })
  return obj[key]
}