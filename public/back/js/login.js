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
          }
        }
      }
    }
  })
})