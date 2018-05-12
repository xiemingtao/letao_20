$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  //定义一个空数组存放上传图片的对象
  var picArr = [];
  
  //进入页面渲染
  render()
  
  //1
  function render() {
    //发送ajax请求获取数据渲染页面
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
        //创建模板,模板和数据相结合
        var htmlStr = template('productTpl', info);
        //页面渲染
        $('.lt_main tbody').html(htmlStr)
        
        //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页码
          totalPages: Math.ceil(info.total / info.size),
          //给每个按钮添加点击事件
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          },
          //改变按钮的样式
          itemTexts: function (type, page, current) {
            
            switch (type) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "page":
                return page;
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
            }
          },
          //改变按钮的title属性样式
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "前往首页";
              case "last":
                return "前往尾页";
              case "page":
                return "前往第" + page + "页";
              case "prev":
                return "前往上一页";
              case "next":
                return "前往下一页";
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }

// 2.点击添加商品按钮弹出模态框
  $('.add_btn').click(function () {
    $('#productModal').modal('show');
    //    发送ajax请求 获取二级分类数据渲染到下拉菜单中
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('secondTpl', info);
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })

// 3 给下拉菜单添加点击事件
  $('.dropdown-menu').on('click', 'a', function () {
    //    获取文本内容
    var txt = $(this).text()
    //  获取二级分类ID(归属品牌)
    var id = $(this).data('id');
    
    $('.dropdownText').text(txt)
    
    //将ID添加到表单控件中,用于添加商品操作
    $('[name="brandId"]').val(id);
    
    $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    
  })

// 4 上传图片配置
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      
      var picObj = data.result;
      var picUrl = data.result.picAddr;
      $('.imgBox').prepend('<img src=' + picUrl + ' height="100">');
      //在数组前面添加数据
      picArr.unshift(picObj);
      //如果数组超过3个就删除最后一个
      if (picArr.length > 3) {
        //删除数组的最后一位
        picArr.pop()
        $('.imgBox img:last-child').remove()
      }
      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
      }
      
      
    }
  });

//  校验表单
  $('#form').bootstrapValidator({
    // 默认对隐藏域不进行校验, 我们需要重置
    excluded: [],
    
    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //品牌名称
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      //商品名称
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
            message: "请添加商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存要求, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品库存要求, 两位数字-两位数字, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      },
      
      
    }
  })

// 表单检验成功后 阻止表单提交 由ajax提交
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    
    var params = $('#form').serialize();
    
    // console.log(picArr);
    //手动拼接成所需的数据模式
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr
    console.log(params);
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: params,
      dataType: 'json',
      success: function (info) {
        console.log(info);
        render()
        $('#productModal').modal('hide');
        //重置表单校验状态
        $('#form').data('bootstrapValidator').resetForm(true);
        //删除图片
        $('.imgBox img').remove();
        //重置下拉框
        $('.dropdownText').text('请选择二级分类')
        //  清空数组
        picArr = [];
      }
    })
    
  })
  
})