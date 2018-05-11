$(function () {
  
  
  var currentPage = 1;
  var pageSize = 5;
  render()
  function render() {
    
    // 发送ajax请求 通过模板渲染到页面中
    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
      dataType: 'json',
      data: {
        pageSize: pageSize,
        page: currentPage
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('firstTpl', info);
        $('.lt_main tbody').html(htmlStr)
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          
          currentPage: info.page,
          
          totalPages: Math.ceil(info.total / info.size),
          //  设置分页点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
          
        })
      }
    })
  }
  
  $('.add_btn').click(function () {
      //显示模态框
      $('#cateModal').modal('show')
  })
//  检验表格
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名"
          }
        }
      }
    }
  })
  
//  表单检验成功 阻止表格提交 由ajax提交
  $('#form').on('success.form.bv',function (e) {
      e.preventDefault()
    
  //  发送ajax请求
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      success:function (info) {
        // console.log(info);
        if(info.success){
          $('#cateModal').modal('hide')
          currentPage = 1
          render()
          
          $('#form').data('bootstrapValidator').resetForm(true)
        }
      }
    })
  })
})