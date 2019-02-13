<template>
    <div class="commodityout">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品出库</span> 

            </div>
            <div class="text item">
                <el-form :model="commodityoutForm" status-icon :rules="rules" ref="commodityoutForm" class="demo-ruleForm">
                    <el-form-item label="商品条形码：" prop="goodsbarcode">
                        <el-input type="text" v-model="commodityoutForm.goodsbarcode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量：" prop="number">
                        <el-input type="text" v-model="commodityoutForm.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <div class="btn">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">加入订单</el-button>
                            <el-button type="primary" @click="onSubmit">重新出库</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column prop="goodsname" label="名称">
                </el-table-column>

                <el-table-column prop="quantity" label="数量">
                </el-table-column>
                <el-table-column prop="unitprice" label="单价(元)">
                </el-table-column>
                <el-table-column prop="totalprice" label="总价(元)">
                </el-table-column>
                <el-table-column prop="saleprice" label="优惠总价">
                </el-table-column>

            </el-table>
            <div class="formwrapper">
            <el-form :model="commodityoutForm" status-icon :rules="rules" ref="commodityoutForm" class="demo-ruleForm">
                <div class="vipnum">
                    <el-form-item label="会员卡号：" prop="vipnumber">
                        <el-input type="text" v-model="commodityoutForm.vipnumbere" autocomplete="off" placeholder="请填写会员卡卡号"></el-input>
                    </el-form-item>
                </div>
                <div class="btn2">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认提交</el-button>

                    </el-form-item>
                </div>
            </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      commodityoutForm: {
        goodsbarcode: "",
        number: "",
        vipnumber: ""
      },
      rules: {
        goodsbarcode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        vipnumber: [
          { required: true, message: "请输入会员卡号", trigger: "blur" }
        ]
      },

      tableData: [
        {
          goodsname: "",
          quantity: "",
          unitprice: "",
          totalprice: "",
          saleprice: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="less">
.commodityout {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background: #f1f1f1;
    }
    .el-card__body{
        .formwrapper{
            .el-form{
                .btn2{
                       .el-form-item{
                           .el-form-item__content{
                               .el-button {
                                   
                               }
                           }
                       }
                    }
                .vipnum{
                    
                    .el-form-item {
                        .el-form-item__content{
                            .el-input{
                             
                                .el-input__inner{
                                    width: 350px;   
                                   
                                }
                            }
                        }
                    }
                }
            }
        }
    .text {
      .el-form {
        width: 350px;
        .vipnum {
          .el-form-item {
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  width: 300px;
                  margin-left: -500px;
                }
              }
            }
          }
        }
      
      }
      
    }
    .el-table{
          border-top: 2px solid #ccc;
      }
  }
}
}
</style>

