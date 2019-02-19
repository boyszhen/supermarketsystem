<template>
  <div class="vipnumadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加编辑账号</span>

      </div>
      <div class="text item">
        <div class="fromwrapper">
          <el-form :model="vipnumAddForm" status-icon :rules="alterRules" ref="vipnumAddForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="真实姓名" prop="username">
              <el-input type="text" v-model="vipnumAddForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员卡号" prop="vipnumber">
              <el-input type="text" v-model="vipnumAddForm.vipnumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员等级" prop="userGrade">
              <el-select v-model="vipnumAddForm.userGrade" placeholder="请选择用户组">
                <el-option label="普通会员15%" value="普通会员15%"></el-option>
                <el-option label="青铜会员20%" value="青铜会员20%"></el-option>
                <el-option label="白银会员30%" value="白银会员30%"></el-option>
                <el-option label="黄金会员40%" value="黄金会员40%"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证号" prop="idcard">
              <el-input type="text" v-model="vipnumAddForm.idcard" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-radio-group v-model="vipnumAddForm.radio">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input type="text" v-model="vipnumAddForm.phonenumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员积分" prop="integral">
              <el-input type="text" v-model="vipnumAddForm.integral" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="emailadress">
              <el-input type="text" v-model="vipnumAddForm.emailadress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地区选择" prop="userprivce">
              <el-select v-model="vipnumAddForm.userprivce" placeholder="--请选择省份--">
                <el-option label="北京" value="北京"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="广东" value="广东"></el-option>
                <el-option label="重庆" value="重庆"></el-option>
                <el-option label="四川" value="四川"></el-option>
                <el-option label="湖南" value="湖南"></el-option>
                <el-option label="湖北" value="湖北"></el-option>
                <el-option label="河南" value="河南"></el-option>
                <el-option label="山东" value="山东"></el-option>
                <el-option label="江苏" value="江苏"></el-option>
                <el-option label="山西" value="山西"></el-option>
              </el-select>
              <el-select class="select2" v-model="vipnumAddForm.usercity" placeholder="--请选择省份--">
                <el-option label="北京" value="北京"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <el-option label="广东" value="广东"></el-option>
                <el-option label="重庆" value="重庆"></el-option>
                <el-option label="四川" value="四川"></el-option>
                <el-option label="湖南" value="湖南"></el-option>
                <el-option label="湖北" value="湖北"></el-option>
                <el-option label="河南" value="河南"></el-option>
                <el-option label="山东" value="山东"></el-option>
                <el-option label="江苏" value="江苏"></el-option>
                <el-option label="山西" value="山西"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="adress">
              <el-input type="text" v-model="vipnumAddForm.adress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="zipcode">
              <el-input type="text" v-model="vipnumAddForm.zipcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="submitForm('vipnumAddForm')">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            //验证手机号码函数
            const checkPhoneNum = function (rule,value,callback) {
                let res = /^1(3|4|5|7|8)\d{9}$/;
                if (value === ""){
                    callback(new Error("请输入电话"));
                } else if (!res.test(value)) {
                    callback(new Error("请输入正确格式的电话号码"))
                }else{
                    callback();
                }
            };
            return {
                vipnumAddForm: {
                    username: "",
                    vipnumber: "",
                    userGrade: "",
                    idcard: "",
                    radio: "",
                    phonenumber: "",
                    integral: "",
                    emailadress: "",
                    adress: "",
                    zipcode: "",
                    userprivce: "",
                    usercity: ""
                },
                radio: {},
                alterRules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
                    ],
                    vipnumber: [
                        { required: true, message: "请输入会员卡号", trigger: "blur" },
                        { min: 6, max: 6, message: "长度为6位", trigger: "blur" }
                    ],
                    userGrade: [
                        { required: true, message: "请选择用户组", trigger: "blur" }
                    ],
                    phonenumber : [
                        { required : true, validator : checkPhoneNum , trigger : "blur" }
                    ],
                    integral : [
                        { required : true,message : "请输入会员积分",trigger : "blur" }
                    ]
                }
            };
        },
        methods : {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let userGrade = this.vipnumAddForm.userGrade.substring(0,4);
                    let discount = this.vipnumAddForm.userGrade.substr(4);
                    if (valid) {
                        let parms = {
                            username : this.vipnumAddForm.username,
                            vipnumber : this.vipnumAddForm.vipnumber,
                            phonenumber : this.vipnumAddForm.phonenumber,
                            integral : this.vipnumAddForm.integral,
                            userGrade,
                            discount
                        };
                        this.axios.post("http://127.0.0.1:888/vip/vipadd",qs.stringify(parms))
                            .then(response => {
                                let { err_code,reason } = response.data;
                                if (err_code === 0){
                                    this.$message({
                                        type : "success",
                                        message : reason
                                    });
                                    this.$router.push('/accountmanage')
                                } else {
                                    this.$message.error(reason)
                                }
                            })
                            .catch(err =>{
                                if (err) throw err
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="less">
  .vipnumadd {
    .el-card {
      .el-card__header {
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        background: #f1f1f1;
      }
      .text {
        .el-form {
          width: 350px;
          .el-form-item__content {
            .el-select {
              .el-input {
                .el-input__inner {
                  width: 150px;
                  height: 30px;
                  margin-left: -30px;
                  .el-radio-group {
                    margin-left: 30px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .fromwrapper {
      margin-left: -36px;
      .demo-ruleForm {
        .el-form-item {
          .el-form-item__content {
            .el-select {
              left: 30px;
            }
            .select2 {
              left: 100px;
            }
          }
        }
        .el-button {
          margin-left: -70px;
        }
      }
    }
  }
</style>

