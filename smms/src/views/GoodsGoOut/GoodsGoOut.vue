<template>
    <div class="commodityout">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品出库</span>

            </div>
            <div class="text item">
                <el-form :model="commodityoutForm" status-icon :rules="rules" ref="commodityoutForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="订单号：" prop="ordernumber">
                        <el-input type="text" v-model="commodityoutForm.ordernumber" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="名称：" prop="goodname">
                        <el-input type="text" v-model="commodityoutForm.goodname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量：" prop="number">
                        <el-input type="text" v-model="commodityoutForm.number" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="实际售价：" prop="actualprice">
                        <el-input type="text" v-model="commodityoutForm.actualprice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠：" prop="offer">
                        <el-input type="text" v-model="commodityoutForm.offer" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="退款：" prop="refund">
                        <el-input type="text" v-model="commodityoutForm.refund" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">加入订单</el-button>
                        <el-button type="primary" @click="onSubmit">重新出库</el-button>
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
      commodityoutForm: {
        ordernumber: "",
        goodname: "",
        number: "",
        actualprice: "",
        offer: "",
        refund: ""
      },
      rules: {
        ordernumber: [
          { required: true, message: "请输入订单号", trigger: "blur" }
        ],
        goodname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        number: [
          { required: true, message: "请输入需要出库的数量", trigger: "blur" }
        ],
        actualprice: [
          { required: true, message: "请输入实际售价", trigger: "blur" }
        ],
       offer: [
          { required: true, message: "请输入优惠的价格", trigger: "blur" }
        ],
        refund: [
          { required: true, message: "请输入需要出库的数量", trigger: "blur" }
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
    .el-card__body {
      .formwrapper {
        .el-form {
          .btn2 {
            .el-form-item {
              .el-form-item__content {
                .el-button {
                }
              }
            }
          }
          .vipnum {
            .el-form-item {
              .el-form-item__content {
                .el-input {
                  .el-input__inner {
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
      .el-table {
        border-top: 2px solid #ccc;
      }
    }
  }
}
</style>

