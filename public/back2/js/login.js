$(function () {
  // 判断用户名和密码的规则
  $('#form').bootstrapValidator({
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //  检验用户名,对应表单的用户名的name属性
      username: {
        validators: {
          //检验不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          //  长度检验
          stringLength: {
            min: 2,
            max: 30,
            message: "用户长度在2到6之间"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6-12位"
          },
          callback: {
            message: "密码错误"
          }
        },
        
      }
    }
  })
  
  
  //判断用户名和密码是是否正确
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    console.log($('#form').serialize());
    $.ajax({
      type: "post",
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          // alert('登录成功')
          location.href = "index.html"
        }
        //用户名出错
        if (info.error === 1000) {
          // alert(info.message)
          $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        }
        
        //密码错误
        if (info.error === 1001) {
          // alert(info.message)
          $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
        }
      }
    })
  })
//  重置表单
//  属性选择器
  $('[type=reset]').click(function () {
    $('#form').data('bootstrapValidator').resetForm()
  })
  
  
})