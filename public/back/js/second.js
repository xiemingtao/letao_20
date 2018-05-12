$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render()
  
  function render() {
    //通过ajax请求数据然后渲染到页面中
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var htmlStr = template('secondTpl', info);
        // console.log(info);
        $('.lt_main tbody').html(htmlStr);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render()
          }
        })
        
      }
    })
  }
  
  $('.add_btn').click(function () {
    $('#secondModal').modal('show')
  })

//  获取一级分类
  $('.add_btn').click(function () {
    $.ajax({
      type: "get",
      url: '/category/queryTopCategoryPaging',
      dataType: "json",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('firstTpl', info);
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })
//图片上传配置
  
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      // console.log(data);
      var boxUrl = data.result.picAddr
      //给img标签设置新的src
      $('.imgBox').attr('src', boxUrl);
      //因为提交表单需要表单控件,所以我们将图片地址提供给对用name属性过得表单控件
      $('[name="brandLogo"]').val(boxUrl);
      //重置表单校验时的状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }
  })
  
//  给每个一级分类下拉框绑定点击事件
  $('.dropdown-menu').on('click','a',function () {
      var  txt = $(this).text()
      
    $('.dropdownText').text(txt);
    
  //   获取对应一级目录的ID
    var id = $(this).data('id');
  //  将ID提交给对用的表单控件
    
    $('[name="categoryId"]').val(id);
    //重置表单校验时的状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })
  
//  检验表单
  $('#form').bootstrapValidator({
    //因为隐藏域的表单控件默认不校验,需要重新设置
    excluded: [],
    
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请输入二级分类品牌地址"
          }
        }
      }
    }
  })
  
//  表单检验成功后  阻止表单自动提交  由ajax提交
  $('#form').on('success.form.bv',function (e) {
    // console.log('hah');
    e.preventDefault()
    
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      dataType:'json',
      success:function (info) {
        console.log(info);
        if(info.success){
          $('#secondModal').modal('hide')
          
          $('#form').data('bootstrapValidator').resetForm(true);
          
          $('.dropdownText').text('请选择一级分类');
          
          $('.imgBox').attr('src','./images/none.png')
          render()
        }
      }
    })
  })
})