//入口函数,可以防止全局变量污染
$(function () {
//  要求 用户名密码不能为空

//  1:表单校验功能 给表单设置name属性
  $('#form').bootstrapValidator({
    //  配置字段 :
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    fields: {
      //配置对应字段名
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          //  长度校验
          stringLength: {
            message: "用户名2-6位",
            max: 6,
            min: 2
          },
          callback:{
            message:"用户名不存在"
          }
          
        }
      },
      password: {
        
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            max: 12,
            min: 6,
            message: "密码长度必须在6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  })
  
  
  
  /*表单校验插件
  * 如果在提交时校验成功,会自动继续提交,需要组织这次提交,通过ajax请求
  * 如果校验失败了 直接提示用户输入有误,不会提交*/
  
  
  //
  $('#form').on('success.form.bv',function (e) {
    //阻止默认的提交
    e.preventDefault()
  //  通过ajax提交
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      dataType:"json",
      data:$('#form').serialize(),
      success:function (info) {
        console.log(info);
        if(info.success){
          // alert('登录成功')
          // location.href ="index.html"
        }
        if(info.error===1001){
          // alert('密码错误')
          //updateStatus 三个参数
          //1- 字段名称
          //2- 校验状态 VALID INVALID
          //3- 校验规则(主要用来设置 提示信息)
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
        if(info.error===1000){
          // alert('用户名不存在')
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
      }
    })
  })
  
//  重置事件
  console.log($('[type="reset"]'));
  $('[type="reset"]').click(function () {
  //    不仅内容重置 校验状态重置
    
    //传true不仅重置校验状态,还重置表单内容
    $('#form').data("bootstrapValidator").resetForm();
  })
})

