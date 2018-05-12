$(function () {
//    发送ajax请求渲染页面
  var currentPage = 1;
  var pageSize = 5;
  //声明一个数组来存取图片
  var imgArr = [];
  render()
  
  //发送ajax渲染页面
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('productTpl', info);
        $('.lt_main tbody').html(htmlStr);
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first" :
                return '首页';
              case "last" :
                return '尾页';
              case "prev" :
                return '上一页';
              case "next" :
                return '下一页';
              case "page" :
                return page;
              
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first" :
                return '前往首页';
              case "last" :
                return '前往尾页';
              case "prev" :
                return '前往上一页';
              case "next" :
                return '前往下一页';
              case "page" :
                return "前往第" + page + "页";
              
            }
          },
          useBootstrapTooltip: true,
          onPageClicked: function (a, b, b, page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }

//  给上架下架按钮添加点击事件
  $('.lt_main tbody').on('click', '.btn', function () {
    //获取当前商品的id
    var id = $(this).parent().data('id');
    
  })

//  点击添加按钮显示模态框
  $('.btn_add').click(function () {
    $('#proModal').modal('show')
    //  发送ajax请求渲染下拉框
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: "get",
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('cateTpl', info);
        
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })

//  给下拉列表添加点击事件
  $('.dropdown-menu').on('click', 'a', function () {
    //    获取文本
    var txt = $(this).text()
    //赋值文本框
    $('.dropdownText').text(txt)
    //  获取ID
    var id = $(this).data('id')
    //  将ID传给表单控件
    $('[name="brandId"]').val(id);
    
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

//  上传图片配置
//内部对文件上传的ajax的操作进行了封装
  /*
  * 如果是单图片发送一次
  * 如果是多图片,就会发送多次请求,会遍历所有的图片,进行多次请求(意味着会有多次响应)*/
  
  $('#fileupload').fileupload({
    type: 'json',
    done: function (e, data) {
      
      var picUrl = data.result.picAddr
      
      var picObj = data.result;
      
      $('.imgBox').prepend("<img src=" + picUrl + " height=100>")
      //将图片对象添加到数组中
      //unshift 在数组前面添加  shift 删除数组最前面一个
      imgArr.unshift(picObj);
      //如果数组的长度大于3就删除最后数组的最后一个
      if (imgArr.length > 3) {
        //pop删除数组的最后一个
        imgArr.pop();
        $('.imgBox img:last-child').remove()
      }
      
    }
  })


//  表单校验   正则检验 必须非零开头
  $('#form').bootstrapValidator({
    excluded: [],
    
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      //库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '用户库存要求,非零开头的数字'
          }
        }
      },
      //尺寸
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '用户库存要求,例如32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '用户库存要求,非零开头的数字'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '用户库存要求,非零开头的数字'
          }
        }
      },
    }
  })
  
  //校验成功 阻止表单提交由ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (info) {
        console.log(info);
        //重置表单
        $('#form').data('bootstrapValidator').resetForm(true);
        
        $('.dropdownText').text('请选择二级分类')
        
        render();
      }
    })
  })
  
  $('#form').serialize()
})