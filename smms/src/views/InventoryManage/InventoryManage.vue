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
        <el-table ref="multipleTable" :data="instockTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="producbarcode" label="商品条形码">
          </el-table-column>
          <el-table-column prop="goodname" label="商品名称">
          </el-table-column>

          <el-table-column prop="purchaseprice" label="进价(元)">
          </el-table-column>
          <el-table-column prop="storabge" label="入库">
          </el-table-column>
          <el-table-column prop="instock" label="库存">
          </el-table-column>
          <el-table-column prop="sold" label="已售">
          </el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--批量删除的按钮-->
        <div style="margin-top: 30px; text-align: left">
          <el-button @click="batchDelete">批量删除</el-button>
          <el-button @click="canselSelect()">取消选择</el-button>
        </div>
        <!--分页-->
        <div style="margin-top: 30px; text-align: left">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 3, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <!--弹出模态框-->
        <el-dialog title="修改账号" :visible.sync="flag" width="700px">
          <el-form :model="instockaddAddForm" label-width="60px">
            <!-- 账号 -->
            <el-form-item label="商品条形码:" prop="producbarcode">
              <el-input type="text" v-model="instockaddAddForm.producbarcode" autocomplete="off" placeholder="请输入条形码"></el-input>
            </el-form-item>
            <el-form-item label="商品名称:" prop="goodname" class="mini" placeholder="请输入商品名称">
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>

        </el-dialog>
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
      instockTableData: [],
      flag: false,
      instockaddAddForm: {
        producbarcode: "",
        goodname: "",
        purchaseprice: "",
        storabge: "",
        instock: "",
        sold: ""
      },
      editId: "",
      selectedAccount: [], //被选中的表格数据
      total: 0, //数据总数,
      pageSize: 3, //每页条数
      currentPage: 1, //当前页码
      instockmanage: {
        categories: "",
        serch: ""
      }
    };
  },
  created() {
    //自动发送请求 获取所有用户的账户数据
    this.getAccountListByPage();
  },
  methods: {
    //根据页面请求数据
    getAccountListByPage() {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      this.axios
        .get("http://127.0.0.1:888/incoming/accountlistbypage", {
          // http://127.0.0.1:666/incoming/accountlistbypage 正确的
          // http://127.0.0.1:666/incomimg/accountlistbypage 错误的
          params: {
            pageSize,
            currentPage
          }
        })
        .then(response => {
          let { total, data } = response.data;
          this.total = total;
          this.instockTableData = data;
          //如果当前页没有数据 且排除第一页
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getAccountListByPage();
          }
          // console.log(response.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.selectedAccount = val;
    },
    handleEdit(id) {
      //把修改的这一条id保存下来
      this.editId = id;

      // 显示模态框
      this.flag = true;
      this.axios
        .get(`http://127.0.0.1:888/incoming/accountinstockedit?id=${id}`)
        .then(response => {
          let result = response.data[0];
          //回填数据
          (this.instockaddAddForm.producbarcode = result.producbarcode),
            (this.instockaddAddForm.goodname = result.goodname),
            (this.instockaddAddForm.purchaseprice = result.purchaseprice),
            (this.instockaddAddForm.storabge = result.storabge),
            (this.instockaddAddForm.instock = result.instock),
            (this.instockaddAddForm.sold = result.sold);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveEdit() {
      let params = {
        producbarcode: this.instockaddAddForm.producbarcode,
        goodname: this.instockaddAddForm.goodname,
        purchaseprice: this.instockaddAddForm.purchaseprice,
        storabge: this.instockaddAddForm.storabge,
        instock: this.instockaddAddForm.instock,
        sold: this.instockaddAddForm.sold,
        editId: this.editId
      };
      console.log(params);
      //发送axios把新数据传给后端
      this.axios
        .post(
          "http://127.0.0.1:888/incoming/saveeditaccountinstock",
          qs.stringify(params)
        )
        .then(response => {
          // 接收后端返回的错误码 和 提示信息
          let { error_code, reason } = response.data;
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            //自动刷新获取数据
            this.getAccountListByPage();
            //关闭模态框
            this.flag = false;
          } else {
            // 弹出失败的提示
            this.$message.error(reason);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(id) {
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtomText: "确定",
        cancelButtomText: "取消",
        type: "warning"
      }).then(() => {
        //发送ajax把id传给后端
        this.axios
          .get(`http://127.0.0.1:888/incoming/accountinstockdel?id=${id}`)
          .then(response => {
            console.log(response.data);
            // 接收后端返回的错误码 和 提示信息
            let { error_code, reason } = response.data;
            // 根据后端响应的数据判断
            if (error_code === 0) {
              // 弹出成功的提示
              this.$message({
                type: "success",
                message: reason
              });
              //自动刷新获取数据
              this.getAccountListByPage();
            } else {
              // 弹出失败的提示
              this.$message.error(reason);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //批量删除
    batchDelete() {
      //收集要删除的数据的id  勾几个就选几个   是个数组
      let selectId = this.selectedAccount.map(v => v.id);
      //如果用户什么都没选
      if (!selectId.length) {
        this.$message.error("请选择以后再操作");
        return; //不执行下面代码
      }
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtomText: "确定",
        cancelButtomText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送axios把收集的id传给后端
          this.axios
            .get(`http://127.0.0.1:888/incoming/batchdelete`, {
              params: {
                selectId
              }
            })
            .then(response => {
              // 接收后端返回的错误码 和 提示信息
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                //自动刷新获取数据
                this.getAccountListByPage();
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页
    handleSizeChange(val) {
      //每页显示条数
       this.currentPage = val;
      //调用分页函数
      this.getAccountListByPage();
    },
    //野马改变
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val;
      this.getAccountListByPage();
    },
    canselSelect(rows) {
      this.$refs.multipleTable.clearSelection();
    },
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

