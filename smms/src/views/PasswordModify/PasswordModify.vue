<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <div class="text item">
                <el-form :model="passwordmodifyFrom" status-icon :rules="rules" ref="passwordmodifyFrom" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPass">
                        <el-input type="password" v-model="passwordmodifyFrom.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass">
                        <el-input type="password" v-model="passwordmodifyFrom.newPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="againNewPass">
                        <el-input type="password" v-model="passwordmodifyFrom.againNewPass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('passwordmodifyFrom')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script> 
import qs from 'qs';
export default { 
 
  data() {
    // 自定义密码的验证
    const checknewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("长度在 3 - 6 位"));
      } else {
        if (this.passwordmodifyFrom.againNewPass !== "") {
          this.$refs.passwordmodifyFrom.validateField("againNewPass");
        }
        callback();
      }
    };

    // 自定义确认新密码的验证
    const checkagainNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordmodifyFrom.newPass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    const checkoldpwd = (rule, value, callback) => {
         // 获取当前登录的账户
      let username =window.localStorage.getItem("username");
      //发送ajax给后台对比老密码是否正确
      this.axios
        .get(`http://127.0.0.1:666/account/checkoldpasword?oldPass=${value}&username=${username}`)
        .then(response => {
          let {error_code,reason} = response.data
          if(error_code !=0){
           callback(new Error(reason))
          }else{
            callback()
          }
          console.log(response.data)
        })
        .catch(err => {
          console.log(err);
        });
    };
    return {
      passwordmodifyFrom: {
        oldPass: "",
        newPass: "",
        againNewPass: ""
      },
      rules: {
        oldPass: [{ required: true, validator: checkoldpwd, trigger: "blur" }],
        newPass: [{ required: true, validator: checknewPass, trigger: "blur" }],
        againNewPass: [
          { required: true, validator: checkagainNewPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         //收集参数
         let params ={
           username:window.localStorage.getItem("username"),
           oldPass :this.passwordmodifyFrom.oldPass,
           newPass :this.passwordmodifyFrom.newPass
         }
         this.axios.post("http://127.0.0.1:666/account/savepwd",qs.stringify(params))
         .then(response=>{
          let {error_code,reason}=response.data
          if(error_code === 0){
            //清除token
            window.localStorage.removeItem('token')
            this.$message({
              type:'success',
              message:reason
            });
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
          }else{
            this.$message.error(reason)
          }
         })
         .catch(err=>{
           console.log(err)
         })
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.passwordmodify {
  .el-card {
    border: 1px solid #ccc;
    .el-card__body {
      .text {
        width: 350px;
        .el-form {
          .el-form-item {
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>