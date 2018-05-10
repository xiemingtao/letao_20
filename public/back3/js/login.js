

$(function () {
  //检验用户名和密码是否符合规则
  $('#form').bootstrapValidator({
    //指定检验时的图标,显示bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定检验字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须在2-6之间"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:30,
            message:"密码长度在6-30之间"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
    
  })
  
  
  $('#form').on('success.form.bv',function (e) {
      //表单检验成功阻止自己提交,由ajax提交
      e.preventDefault()
    console.log($('#form').serialize());
    //  检验用户名和密码是否正确
    $.ajax({
      url:"/employee/employeeLogin",
      type:"post",
      data:$('#form').serialize(),
      dataType:"json",
      success:function (info) {
        //用户名错误
        if(info.error==1000){
          //更新表格用户检验状态
          $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback")
          // alert(info.message)
        }
        
        //密码错误
        if(info.error==1001){
          //更新表格密码检验状态
          $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback")
          // alert(info.message)
        }
        //登录成功
        if(info.success){
          console.log(info);
          // alert('登录成功')
        location.href ="index.html"
        }
        
      }
    })
  })
  
//  重置表格的状态

  $('.btn_reset').click(function () {
      $('#form').data('bootstrapValidator').resetForm()
  })
})