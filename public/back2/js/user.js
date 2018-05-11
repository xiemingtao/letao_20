$(function () {
//向后台请求书库,用户列表数据,通过模板引擎进行页面渲染

//  如果后台返回的响应头中,设置了content-type为applocation/json
//  jQuery 会自动按照json格式进行解析响应结果,我们就不用设置dataType了
//  声明一个变量
  var currentPage = 1;
  var currentSize = 5;

//模板使用步骤
  /*
  * 1.引入JS文件
  * 2.准备模板
  * 3.准备数据
  * 4.将数据和模板结合 渲染到页面
  *
  * */
  render();
  
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      dataType: 'json',//可以省略
      data: {
        page: currentPage,
        pageSize: currentSize
      },
      success: function (info) {
        console.log(info);
        
        var htmlStr = template('template', info)
        
        //  进行渲染
        
        $('.lt_main tbody').html(htmlStr);
        //配置分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            // event
            //type 可以标记按钮的功能类型
            //page表示将要渲染的页码
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }
        });
      }
    })
  }
  // var id;
  // var isDelete;
  
  $('.lt_main tbody').on('click', '.btn', function () {
    $('#userModal').modal('show');
    
    var id = $(this).parent().data('id');
    // console.log($(this).parent());
    // console.log(id);
    var isDelete = $(this).hasClass('btn-success')? 1 : 0;
    
    //通过off方法可以解绑之前的点击事件,然后重新绑定新的点击事件
    $('.subBtn').off().click(function () {
      $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
          isDelete:isDelete,
          id:id
        },
        success:function (info) {
          console.log(info);
          $('#userModal').modal('hide')
          render()
        }
      })
    })
  });
  
 
})