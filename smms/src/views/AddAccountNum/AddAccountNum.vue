<template>
    <div class="addaccountnum">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
            <div class="text item">
                <el-form :model="accountNum" status-icon :rules="rules" ref="accountNum" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="user">
                        <el-input type="text" v-model="accountNum.user" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="accountNum.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="accountNum.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组" prop="group">
                        <el-select v-model="accountNum.group" placeholder="请选择用户组">
                            <el-option label="普通用户" value="普通用户"></el-option>
                            <el-option label="高级用户" value="高级用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('accountNum')">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import moment from "moment";
import qs from "qs";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.accountNum.checkPass !== "") {
          this.$refs.accountNum.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountNum.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      accountNum: {
        user: "",
        pass: "",
        group: "",
        checkPass: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "请输入3-6位的用户名", trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        group: [{ required: true, message: "请选择用户组", trigger: "blur" }]
      },
      sizeForm: {
        group1: "普通用户",
        group2: "高级用户"
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            user: this.accountNum.user,
            pass: this.accountNum.pass,
            group: this.accountNum.group
          };
          this.axios 
            .post(
              "http://127.0.0.1:888/account/accountadd",
              qs.stringify(params)
            )
            .then(response => {
              // 接收后端返回的错误码 和 提示信息
              let { error_code, reason } = response.data;
              // 根据后端响应的数据判断
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });
                // 跳转到账号管理列表
                this.$router.push("/manageaccountnum");
               
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.addaccountnum {
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