$(function () {
  //初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  
//  初始化轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  

  
  
})
//  封装一个获取地址栏参数的方法
function getSearchKey(key) {
  // 获取地址栏参数  "?name=pp&age=18&desc=%E5%B8%85"
  var search = location.search;
  // 需要解码  "?name=pp&age=18&desc=帅"
  search = decodeURI( search );
  // 去掉 ?
  search = search.slice(1);
  // 根据 & 将字符串, 切割成数组   ["name=pp", "age=18", "desc=帅"]
  var arr = search.split("&");
  
  var obj = {};
  
  arr.forEach(function( element, index ) {
    // "name=pp"
    var k = element.split("=")[0];
    var v = element.split("=")[1];
    // obj["name"]="pp";
    obj[ k ] = v;
  });
  
  // return obj["name"];
  return obj[ key ];
}