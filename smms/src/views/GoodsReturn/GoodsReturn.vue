<template>
  <div class="productreturn">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品退货</span>

      </div>
      <div class="text item">
        <el-form :inline="true" :model="serchreturn" class="demo-form-inline" label-position="left">

          <el-form-item prop="serch" label="关键字">
            <el-input type="text" v-model="serchreturn.serch" autocomplete="off" placeholder="请输入商品名称、订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="saleslistTableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="ordernum" label="订单号：">
          </el-table-column>
          <el-table-column prop="goodname" label="商品名称">
          </el-table-column>
          <el-table-column prop="number" label="数量：">
          </el-table-column>
          <el-table-column prop="actualprice" label="实际售价：">
          </el-table-column>
          <el-table-column prop="offer" label="优惠：">
          </el-table-column>
          <el-table-column prop="refund" label="退款：">
          </el-table-column>
        </el-table>

      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      saleslistTableData:[],
      serchreturn: {
        serch: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.axios.get(`http://127.0.0.1:666/commodityout/goodreturn`, {
        params: {
          serch: this.serchreturn.serch
        }
        })
        .then(response => {
            this.saleslistTableData=response.data
          })
          .catch(err => {
            console.log(err);
          })
    }
  }
};
</script>
<style lang="less">
.productreturn {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background: #f1f1f1;
    }
    .el-card__body {
      .text {
        text-align: left;
        .el-input {
          width: 300px;
        }
        .el-button {
          width: 50px;
          height: 40px;
          margin-left: 10px;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>
