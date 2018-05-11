$(function () {
  var currentPage = 1;
  var pageSize = 5;
// 请求数据  渲染页面
  render()
  
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('userTpl', info)
        
        $('.lt_main tbody').html(htmlStr);
        
        //  启用paginator插件分页
        $('#paginator').bootstrapPaginator({
          //设置版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //根据总数和每页数量设置分页
          totalPages: Math.ceil(info.total / info.size),
          size: "small",
          //  设置点击事件
          onPageClicked: function (a, b, c, page) {
            // console.log(page);
            currentPage = page;
            render();
          }
        })
      }
    })
  }

//  给表格中的每个按钮添加点击事件
  
  $('.lt_main tbody').on('click', '.btn', function () {
    
    //显示模态框
    $('#statusModal').modal('show')
    //获取用户ID
    var id = $(this).parent().data('id')
    
    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // console.log(isDelete);
  
    $('.aff_btn').off().on('click',function () {
        $.ajax({
          type:'post',
          url:'/user/updateUser',
          dataType:'json',
          data:{
            id:id,
            isDelete:isDelete
          },
          success:function (info) {
            // console.log(info);
            if(info.success){
              $('#statusModal').modal('hide')
              render()
            }
          }
          
        })
    })
    
  })
  
  
})