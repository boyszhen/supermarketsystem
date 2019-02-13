<template>
    <div class="productreturn">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品退货</span> 

            </div>
            <div class="text item">
                订单号:
                <el-input placeholder="请输入订单号" width="300px"></el-input>
                <el-button type="success" size="mini">查询</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {};
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
