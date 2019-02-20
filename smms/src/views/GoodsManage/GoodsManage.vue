<template>
  <div class="goodsmanage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <el-form :inline="true" :model="goodsmanage" class="demo-form-inline" label-position="left">
          <el-form-item>
            <el-select v-model="goodsmanage.classify" placeholder="--请选择分类--" label-width="50px">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="烟酒" value="烟酒"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="干货" value="干货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input type="text" v-model="goodsmanage.keyword" autocomplete="off" placeholder="商品名称或商品条形码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
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
              <el-button type="primary" size="mini" @click="goodsEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="goodsDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 3, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <div class="delete">
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-button @click="canselSelect()">取消选择</el-button>
        </div>

        <el-dialog title="修改商品信息" :visible.sync="flag">
          <el-form :model="form">
            <el-form-item label="所属分类" :label-width="formLabelWidth">
              <el-select v-model="form.goodclass" placeholder="--请选择分类--">
                <el-option label="烟酒" value="烟酒"></el-option>
                <el-option label="粮油" value="粮油"></el-option>
                <el-option label="日用品" value="日用品"></el-option>
                <el-option label="饮料" value="饮料"></el-option>
                <el-option label="粮油" value="粮油"></el-option>
                <el-option label="干货" value="干货"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input v-model="form.goodsname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品条形码" :label-width="formLabelWidth">
              <el-input v-model="form.goodbarcode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="售价" :label-width="formLabelWidth">
              <el-input v-model="form.saleprice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input v-model="form.warehnumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="市场价" :label-width="formLabelWidth">
              <el-input type="text" v-model="form.marketprice" autocomplete="off" placeholder="市场价"></el-input>
            </el-form-item>
            <el-form-item label="是否促销" :label-width="formLabelWidth">
              <el-radio-group v-model="form.ispromotion">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="saveGoodsEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
  import qs from "qs";
    export default {
        data() {
            return {
                goodsmanage: {
                    classify: "",
                    keyword: ""
                },
                tableData: [],
                editId : 0,
                flag : false,
                form : {
                    goodclass : "",
                    goodsname : "",
                    saleprice: "",
                    ispromotion : "",
                    marketprice : "",
                    warehnumber : "",
                    goodbarcode : "",
                    stockprice : ""
                },
                formLabelWidth : "120px",
                //批量删除Id
                batchDeleteId : "",
                currentPage : 1,
                pageSize : 3,
                total : 0
            };
        },
        created (){
            this.getGoodsListByPage();
        },
        methods: {
            // getGoodsList() {
            //     this.axios.get("http://127.0.0.1:888/goods/goodslist")
            //         .then(response => {
            //             this.tableData = response.data
            //         })
            //         .catch(err => {
            //             if (err) throw err
            //         })
            // },
            //根据页码和每页数据条数获取数据函数
            getGoodsListByPage(){
                //发送数据给后端
                this.axios.get("http://127.0.0.1:888/goods/goodsByPage",{
                    params : {
                        currentPage : this.currentPage,
                        pageSize : this.pageSize,
                        classify : this.goodsmanage.classify,
                        keyword : this.goodsmanage.keyword
                    }
                })
                    .then(response => {
                        let {total,data} = response.data;
                        this.total = total;
                        this.tableData = data;
                        if (!data.length && this.currentPage !== 1){
                            this.currentPage -= 1;
                            this.getVipListByPage();
                        }
                    })
                    .catch(err => {
                        if (err) throw err;
                    })
            },
            //查询函数
            search(){
              this.getGoodsListByPage();
            },
            // 每页条数改变
            handleSizeChange(val) {
                this.pageSize = val;
                this.getGoodsListByPage();
            },
            //页码改变
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getGoodsListByPage();
            },
            canselSelect(rows) {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.batchDeleteId = val;
            },
            batchDelete(){
                if(this.batchDeleteId.length>0){
                    let batchId = this.batchDeleteId.map(item => item.id);
                    if (batchId.length>0) {

                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.axios.get(`http://127.0.0.1:888/goods/batchdelete?id=${batchId}`)
                                .then(response => {
                                    let {err_code, reason} = response.data;
                                    if (err_code === 0) {
                                        this.$message({
                                            type: "success",
                                            message: reason
                                        });
                                        this.getGoodsListByPage();
                                    } else {
                                        this.$message.error(reason);
                                    }
                                })
                                .catch(err => {
                                    if (err) throw err
                                });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }else {
                        this.$message.error("请选择后操作")
                    }
                }
            },
            goodsEdit(id) {
                this.flag = true;
                this.editId = id;
                this.axios.get(`http://127.0.0.1:888/goods/goodsedit?id=${id}`)
                    .then(response => {
                        this.form.goodsname = response.data[0].goodname;
                        this.form.goodclass = response.data[0].goodclass;
                        this.form.saleprice = response.data[0].saleprice;
                        this.form.goodbarcode = response.data[0].goodbarcode;
                        this.form.warehnumber = response.data[0].instock;
                        this.form.marketprice = response.data[0].marketprice;
                        if (response.data[0].ispromotion === "未促销"){
                            this.form.ispromotion = 2;
                        } else {
                            this.form.ispromotion = 1;
                        }
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
            //保存修改函数
            saveGoodsEdit(){
                let ispromotion = "";
                if (this.form.ispromotion === 1){
                    ispromotion = "促销"
                } else {
                    ispromotion = "未促销"
                }
                let stockprice = this.form.warehnumber * this.form.saleprice;
                let params = {
                    goodname : this.form.goodsname,
                    goodclass : this.form.goodclass,
                    goodbarcode : this.form.goodbarcode,
                    saleprice : this.form.saleprice,
                    marketprice : this.form.marketprice,
                    instock : this.form.warehnumber,
                    ispromotion,
                    stockprice,
                    id : this.editId
                };
              this.axios.post("http://127.0.0.1:888/goods/savagoodsedit",qs.stringify(params))
                  .then(response => {
                      let {err_code,reason} = response.data;
                      if (err_code === 0){
                          this.$message({
                              type : "success",
                              message : reason
                          });
                          this.getGoodsListByPage();
                          this.flag = false;
                      } else {
                          this.$message.error(reason);
                      }
                  })
                  .catch(err => {
                      if (err) throw err;
                  })
            },
            goodsDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get(`http://127.0.0.1:888/goods/goodsdelete?id=${id}`)
                        .then(response => {
                            let {err_code, reason} = response.data;
                            if (err_code === 0) {
                                this.$message({
                                    type: "success",
                                    message: reason
                                });
                                this.getGoodsListByPage();
                            } else {
                                this.$message.error(reason);
                            }
                        })
                        .catch(err => {
                            if (err) throw err;
                        })
                  })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
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
          .delete{
            margin-top: 30px;
          }
          .el-dialog__wrapper{
            .el-dialog{
              .el-dialog__body{
                .el-form{
                  .el-form-item{
                    .el-form-item__content{
                      .el-input{
                        width: 200px;
                      }
                    }
                  }
                }
              }
            }
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