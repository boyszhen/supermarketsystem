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
          <el-table-column prop="goodbarcode" label="商品条形码">
          </el-table-column>
          <el-table-column prop="goodname" label="商品名称">
          </el-table-column>
          <el-table-column prop="goodclass" label="所属分类">
          </el-table-column>
          <el-table-column prop="saleprice" label="售价(元)">
          </el-table-column>
          <el-table-column prop="ispromotion" label="促销">
          </el-table-column>
          <el-table-column prop="marketprice" label="市场价(元)">
          </el-table-column>
          <el-table-column prop="instock" label="库存">
          </el-table-column>
          <el-table-column prop="stockprice" label="库存总额(元)">
          </el-table-column>
          <el-table-column prop="saletotalprice" label="销售总额(元)">
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
                tableData: []
            };
        },
        created (){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){
                this.axios.get("http://127.0.0.1:888/goods/goodslist")
                    .then(response => {
                        this.tableData = response.data
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
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