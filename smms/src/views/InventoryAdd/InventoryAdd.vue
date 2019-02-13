<template>
    <div class="instockadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>库存管理</span> 

            </div>
            <div class="text item">
                <el-form :model="instockaddAddForm" status-icon :rules="rules" ref="instockaddAddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品条形码:" prop="producbarcode" class="max" placeholder="请输入条形码">
                        <el-input type="text" v-model="instockaddAddForm.producbarcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量：" prop="quantity" placeholder="记重商品单位为千克">
                        <el-input type="text" v-model="instockaddAddForm.quantity" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="进价：" prop="purchaseprice" placeholder="请输入进价">
                        <el-input type="text" v-model="instockaddAddForm.purchaseprice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="mini">添加</el-button>
                    </el-form-item>
                </el-form>
            </div> 
        </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      instockaddAddForm: {
        producbarcode: "",
        quantity: "",
        purchaseprice: ""
      },
      rules: {
        producbarcode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        quantity: [
          { required: true, message: "记重商品单位为千克", trigger: "blur" }
        ],
        purchaseprice: [
          { required: true, message: "请输入进价", trigger: "blur" }
        ]
      }
    };
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
                margin-left: -260px;
            }
          }
        }
      }
    }
  }
}
</style>

