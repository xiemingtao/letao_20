$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  //进入页面调用
  render()

//  请求数据渲染页面
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        
        // console.log(info);
        // 请求到数据用template模板渲染到页面中  引入template的js文件  准备模板
        
        var htmlStr = template('cateTpl', info);
        
        $('.lt_main tbody').html(htmlStr)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //  总页数: 总的数量/每页的数量
          totalPages: Math.ceil(info.total / info.size),
          //空间的大小
          size: "small",
          //  为按钮绑定点击事件
          onPageClicked: function (a, b, c, page) {
            //  type :可以标记按钮的功能
            //  page:表示将要渲染的页面
            // console.log(c);
            currentPage = page;
            render()
          }
        })
        
      }
    })
  }

//  显示添加分类模态框
  $('.btn_cate').on('click', function () {
    $('#catesModal').modal('show')
    
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('dropTpl', info);
        
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })



//  给每一个下拉框绑定点击事件用来选择一级目录
  $('.dropdown-menu').on('click', 'a', function () {
    //获取当前点击a的文本内容
    var txt = $(this).text();
    //给按钮替换内容
    $('.dropdownText').text(txt)
    
    var id = $(this).data('id');
    //将id存入到表单控件里  categoryId(所属分类id)
    $('[name="categoryId"]').val(id)
    $('#form').data('bootstrapValidator').updateStatus('categoryId',"VALID")
    
  })
//  图片上传
  $('#fileUpload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      
      var picUrl = data.result.picAddr;
      $('.imgBox').attr('src', picUrl);
      //将图片地址存到表单控件里  brandLogo(品牌logo图片地址)
      $('[name="brandLogo"]').val(picUrl);
      
      $('#form').data('bootstrapValidator').updateStatus('brandLogo',"VALID")
    }
  })
  
//  表单检验
  $('#form').bootstrapValidator({
    //以为默认对隐藏域不进行校验,所以需要重置
    excluded: [],
    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入品牌名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  
  
  })
  
//  拦截表单  进行ajax提交
  $('#form').on('success.form.bv',function (e) {
      e.preventDefault()
        $.ajax({
          url:'/category/addSecondCategory',
          data:$('#form').serialize(),
          type:'post',
          dataType:'json',
          success:function (info) {
            console.log(info);
            if(info.success){
              $('#catesModal').modal('hide')
              render()
              //  重置
              $('#form').data('bootstrapValidator').resetForm(true)
              
              $('.dropdownText').text('请选择一级目录');
              
              $('.imgBox').attr('src','./images/none.png')
            }
          }
        })
  })
  

  
  
})