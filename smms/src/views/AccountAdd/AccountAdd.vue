<template>
  <div class="vipnumadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加编辑账号</span>

      </div>
      <div class="text item">
        <el-form :model="vipnumAddForm" status-icon :rules="rules" ref="vipnumAddForm" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="username">
            <el-input type="text" v-model="vipnumAddForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号" prop="vipnumber">
            <el-input type="text" v-model="vipnumAddForm.vipnumadd" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div class="fromwrapper">
          <el-form :model="vipnumAddForm" status-icon :rules="rules" ref="vipnumAddForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户组" prop="userGroup">
              <el-select v-model="vipnumAddForm.userGroup" placeholder="请选择用户组">
                <el-option label="普通会员70%" value="普通会员70%"></el-option>
                <el-option label="青铜会员15%" value="青铜会员15%"></el-option>
                <el-option label="青铜会员10%" value="青铜会员10%"></el-option>
                <el-option label="黄金会员5%" value="黄金会员5%"></el-option>

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
            <el-form-item label="座机号码" prop="telnumber">
              <el-input type="text" v-model="vipnumAddForm.telnumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="emailadress">
              <el-input type="text" v-model="vipnumAddForm.emailadress" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-form :model="vipnumAddForm" status-icon :rules="rules" ref="vipnumAddForm" label-width="100px" class="demo-ruleForm">
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
              <el-button type="success" size="mini">添加</el-button>
            </el-form-item>
          </el-form>

        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vipnumAddForm: {
        username: "",
        vipnumber: "",
        userGroup: "",
        idcard: "",
        radio: "",
        phonenumber: "",
        telnumber: "",
        emailadress: "",
        adress: "",
        zipcode: "",
        userprivce: "",
        usercity: ""
      },
      radio: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        vipnumber: [
          { required: true, message: "请输入会员名", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6位", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "changge" }
        ]
      }
    };
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

