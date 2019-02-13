<template>
    <div class="instockmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品入库</span> 
            </div>
            <div class="text item">

                <el-form :inline="true" :model="instockmanage" class="demo-form-inline" label-position="left">
                    <el-form-item label="分类">
                        <el-select v-model="instockmanage.categories" placeholder="--请选择分类--" label-width="50px">
                            <el-option label="烟酒" value="烟酒"></el-option>
                            <el-option label="粮油" value="粮油"></el-option>
                            <el-option label="日用品" value="日用品"></el-option>
                            <el-option label="饮料" value="饮料"></el-option>
                            <el-option label="粮油" value="粮油"></el-option>
                            <el-option label="干货" value="干货"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="serch" label="关键字">
                        <el-input type="text" v-model="instockmanage.serch" autocomplete="off" placeholder="请输入商品名称、条形码"></el-input>
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

                    <el-table-column prop="price" label="进价(元)">
                    </el-table-column>
                    <el-table-column prop="storage" label="入库">
                    </el-table-column>
                    <el-table-column prop="instock" label="库存">
                    </el-table-column>
                    <el-table-column prop="sold" label="已售">
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
      instockmanage: {
        categories: "",
        serch: ""
      },
      tableData: [
        {
          goodsbarcode: "6900452177",
          goodsname: "我的优乐美",
          price: "3.50",
          storage: "29",
          instock: "45",
          sold: "28"
        },
        {
          goodsbarcode: "6900543754",
          goodsname: "龙凤呈祥",
          price: "35",
          storage: "45",
          instock: "25",
          sold: "32"
        },
        {
          goodsbarcode: "6900436974",
          goodsname: "茅台",
          price: "875",
          storage: "45",
          instock: "23",
          sold: "15"
        },
        {
          goodsbarcode: "6900542961",
          goodsname: "旺仔牛奶",
          price: "3.50",
          storage: "67",
          instock: "13",
          sold: "78"
        },
        {
          goodsbarcode: "6900328652",
          goodsname: "冰红茶",
          price: "3.50",
          storage: "67",
          instock: "13",
          sold: "78"
        },
        {
          goodsbarcode: "6900532853",
          goodsname: "脉动",
          price: "3.50",
          storage: "67",
          instock: "13",
          sold: "78"
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
.instockmanage {
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
          // margin-left: -600px;
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

