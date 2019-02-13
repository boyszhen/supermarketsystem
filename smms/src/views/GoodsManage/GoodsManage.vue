<template>
  <div class="goodsmanage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">

        <el-form :inline="true" :model="goodsmanage" class="demo-form-inline" label-position="left">
          <el-form-item>
            <el-select v-model="goodsmanage.categories" placeholder="--请选择分类--" label-width="50px">
              <el-option label="烟酒" value="烟酒"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="干货" value="干货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="serch" label="关键字">
            <el-input type="text" v-model="goodsmanage.serch" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="goodsbarcode" label="商品条形码">
          </el-table-column>
          <el-table-column prop="goodsname" label="商品名称">
          </el-table-column>
          <el-table-column prop="classification" label="所属分类">
          </el-table-column>
          <el-table-column prop="price" label="售价(元)">
          </el-table-column>
          <el-table-column prop="saleprice" label="促销价(元)">
          </el-table-column>
          <el-table-column prop="marketprice" label="市场价(元)">
          </el-table-column>
          <el-table-column prop="instock" label="库存">
          </el-table-column>
          <el-table-column prop="totalinven" label="库存总额(元)">
          </el-table-column>
          <el-table-column prop="totalsales" label="销售总额(元)">
          </el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsmanage: {
        categories: "",
        serch: ""
      },
      tableData: [
        {
          goodsbarcode: "6900452177",
          goodsname: "我的优乐美",
          classification: "饮料",
          price: "3.50",
          saleprice: "未促销",
          marketprice: "4.00",
          instock: "0(缺)",
          totalinven: "0",
          totalsales: "435.60"
        },
        {
          goodsbarcode: "6900543754",
          goodsname: "龙凤呈祥",
          classification: "烟酒",
          price: "35",
          saleprice: "未促销",
          marketprice: "36",
          instock: "20",
          totalinven: "4500",
          totalsales: "6787"
        },
        {
          goodsbarcode: "6900436974",
          goodsname: "茅台",
          classification: "烟酒",
          price: "875",
          saleprice: "845",
          marketprice: "888",
          instock: "68",
          totalinven: "64378",
          totalsales: "65439"
        },
        {
          goodsbarcode: "6900542961",
          goodsname: "旺仔牛奶",
          classification: "饮料",
          price: "3.50",
          saleprice: "未促销",
          marketprice: "4.00",
          instock: "0(缺)",
          totalinven: "0",
          totalsales: "435.60"
        },
        {
          goodsbarcode: "6900328652",
          goodsname: "冰红茶",
          classification: "饮料",
          price: "3.50",
          saleprice: "未促销",
          marketprice: "4.00",
          instock: "0(缺)",
          totalinven: "0",
          totalsales: "435.60"
        },
        {
          goodsbarcode: "6900532853",
          goodsname: "脉动",
          classification: "饮料",
          price: "3.50",
          saleprice: "未促销",
          marketprice: "4.00",
          instock: "0(缺)",
          totalinven: "0",
          totalsales: "435.60"
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
    },
    handleEdit() {},
    handleDelete() {}
  }
};
</script>
<style lang="less">
.goodsmanage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background: #f1f1f1;
    }
    .el-card__body {
      .text {
        .el-pagination {
          margin-top: 30px;
        }
        .el-form {
          margin-left: -600px;
          .el-form-item {
            .el-form-item__content {
              .el-select {
                .el-input {
                  .el-input__inner {
                    text-align: center;
                    width: 150px;
                  }
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
