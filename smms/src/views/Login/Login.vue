<template>
    <div class="login">
        <div class="login-form">
            <h1 class="title">华联超市系统登录</h1>
            <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input v-model.number="loginForm.checkPwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    //验证密码函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("请输入3 - 6位"));
      } else {
        if (this.loginForm.checkPwd !== "") {
          this.$refs.loginForm.validateField("checkPwd");
        }
        callback();
      }
    };
    //验证确认密码函数
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (String(value) !== this.loginForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "请输入3 - 6 位" }
        ],
        password: [{ required: true, validator: pass, trigger: "blur" }],
        checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => { 
        if (valid) {
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          this.axios
            .post("http://127.0.0.1:666/login/checklogin", qs.stringify(params))
            .then(response => {
              //接收后台传来的数据
              let { error_code, reason, token, username } = response.data;
              console.log(username);
              if (error_code === 0) {
                // 把token存在浏览器的本地存储中
                window.localStorage.setItem("token", token);
                // 把用户名存入本地存储
                window.localStorage.setItem("username", username);
                this.$message({
                  type: "success",
                  message: reason
                });
                //跳转
                this.$router.push("/");
              } else {
                this.$message.error(reason);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  height: 100%;
  background: url("./bg1.jpg") no-repeat;
  background-size: cover;
  .login-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 500px;
    height: 350px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0 34px 0 0;
    .title {
      color: #fff;
      text-align: left;
      margin-left: 60px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #fff;
        }
      }
    }
  }
}
</style>