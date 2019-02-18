<template> 
    <div class="instockadd"> 
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span> 

            </div>
            <div class="text item">
                <el-form :model="instockaddAddForm" status-icon :rules="rules" ref="instockaddAddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品条形码:" prop="producbarcode" class="max">
                        <el-input type="text" v-model="instockaddAddForm.producbarcode" autocomplete="off" placeholder="请输入条形码"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称:" prop="goodname" class="max" placeholder="请输入商品名称">
                        <el-input type="text" v-model="instockaddAddForm.goodname" autocomplete="off" placeholder="请输入商品名称"></el-input>
                    </el-form-item> 
                    <el-form-item label="进价：" prop="purchaseprice">
                        <el-input type="text" v-model="instockaddAddForm.purchaseprice" autocomplete="off" placeholder="请输入进价"></el-input>
                    </el-form-item>
                    <el-form-item label="入库：" prop="storabge">
                        <el-input type="text" v-model="instockaddAddForm.storabge" autocomplete="off" placeholder="请输入入库数量"></el-input>
                    </el-form-item>
                     <el-form-item label="库存：" prop="instock">
                        <el-input type="text" v-model="instockaddAddForm.instock" autocomplete="off" placeholder="请输入库存数量"></el-input>
                    </el-form-item>
                     <el-form-item label="已售：" prop="sold">
                        <el-input type="text" v-model="instockaddAddForm.sold" autocomplete="off" placeholder="请输入已输入数量"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('instockaddAddForm')">添加</el-button>
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
    return {
      instockaddAddForm: {
        producbarcode: "",
        goodname:"",
        purchaseprice: "",
        storabge:"",
        instock:"",
        sold:""



      },
      rules: {
        producbarcode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        goodname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        purchaseprice: [
          { required: true, message: "请输入进价", trigger: "blur" }
        ],
        storabge: [
          { required: true, message: "请填写入库数量", trigger: "blur" }
        ],
        instock: [
          { required: true, message: "请输入库存数量", trigger: "blur" }
        ],
        sold: [
          { required: true, message: "请输入已售数量", trigger: "blur" }
        ],
      }
    };
  },
   methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            producbarcode: this.instockaddAddForm.producbarcode,
            goodname: this.instockaddAddForm.goodname,
            purchaseprice: this.instockaddAddForm.purchaseprice,
            storabge: this.instockaddAddForm.storabge,
            instock: this.instockaddAddForm.instock,
            sold: this.instockaddAddForm.sold            
          };
          this.axios 
            .post(
              "http://127.0.0.1:888/incoming/incomingadd",
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
                this.$router.push("/inventorymanage");
               
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
.instockadd {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background: #f1f1f1;
    }
    .el-card__body {
      .el-form {
        width: 300px;
        .max {
          .el-form-item__label {
          }
          .el-form-item__content {
            .el-input {
              width: 300px;
            }
          }
        }
        .el-form-item {
          height: 40px;
          line-height: 40px;
          .el-form-item__lable {
            height: 40px;
            line-height: 40px;
          }
          .el-form-item__content {
            .el-input {
              height: 40px;
              line-height: 40px;
              .el-select__caret {
                height: 40px;
                line-height: 40px;
              }
              .el-input__inner {
                height: 40px;
                line-height: 40px;
              }
            }
            .el-button{
                // margin-left: -260px;
            }
          }
        }
      }
    }
  }
}
</style>

