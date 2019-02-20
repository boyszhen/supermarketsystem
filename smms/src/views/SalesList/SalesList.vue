<template>
  <div class="saleslist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品入库</span>
      </div>
      <div class="text item">

        <el-form :inline="true" :model="saleslist" class="demo-form-inline" label-position="left">
          
          <el-form-item prop="serch" label="关键字">
            <el-input type="text" v-model="saleslist.serch" autocomplete="off" placeholder="请输入商品名称、订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="saleslistTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
        <el-dialog title="修改商品信息" :visible.sync="flag" width="700px">
          <el-form :model="saleslistAddForm" label-width="60px">
            <!-- 账号 -->
            <el-form-item label="订单号：" prop="ordernum">
              <el-input type="text" v-model="saleslistAddForm.ordernum" autocomplete="off" placeholder="请输入条形码"></el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="goodname" class="mini" placeholder="请输入商品名称">
              <el-input type="text" v-model="saleslistAddForm.goodname" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="数量：" prop="number" class="mini" placeholder="请输入商品分类">
              <el-input type="text" v-model="saleslistAddForm.number" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="实际售价：" prop="actualprice">
              <el-input type="text" v-model="saleslistAddForm.actualprice" autocomplete="off" placeholder="请输入进价"></el-input>
            </el-form-item>
            <el-form-item label="优惠：" prop="offer">
              <el-input type="text" v-model="saleslistAddForm.offer" autocomplete="off" placeholder="请输入入库数量"></el-input>
            </el-form-item>
            <el-form-item label="退款：" prop="refund">
              <el-input type="text" v-model="saleslistAddForm.refund" autocomplete="off" placeholder="请输入库存数量"></el-input>
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
      saleslistTableData: [],
      flag: false,
      saleslistAddForm: {
        ordernum: "",
        goodname: "",
        number: "",
        actualprice: "",
        offer: "",
        refund: ""
        
      },
      editId: "",
      selectedAccount: [], //被选中的表格数据
      total: 0, //数据总数,
      pageSize: 3, //每页条数
      currentPage: 1, //当前页码
      saleslist: {
        serch: "",
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
        .get("http://127.0.0.1:666/commodityout/accountlistbypage", {
          // http://127.0.0.1:666/incoming/accountlistbypage 正确的
          // http://127.0.0.1:666/incoming/accountlistbypage 错误的
          params: {
            pageSize,
            currentPage,
           
            serch:this.saleslist.serch //关键字
          }
          
        })
        .then(response => {
          let { total, data } = response.data;
          console.log(response.data)
          this.total = total;
          this.saleslistTableData = data;
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
    //查询
    onSubmit() {
      this.getAccountListByPage();
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
        .get(`http://127.0.0.1:666/commodityout/accountinstockedit?id=${id}`)
        .then(response => {
          let result = response.data[0];
          //回填数据
          (this.saleslistAddForm.ordernum = result.ordernum),
            (this.saleslistAddForm.goodname = result.goodname),
            (this.saleslistAddForm.number = result.number),
            (this.saleslistAddForm.actualprice = result.actualprice),
            (this.saleslistAddForm.offer = result.offer),
            (this.saleslistAddForm.refund = result.refund);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveEdit() {
      let params = {
        ordernum: this.saleslistAddForm.ordernum,
        goodname: this.saleslistAddForm.goodname,
        number: this.saleslistAddForm.number,
        actualprice: this.saleslistAddForm.actualprice,
        offer: this.saleslistAddForm.offer,
        refund: this.saleslistAddForm.refund,
        editId: this.editId
      };
      // console.log(params);
      //发送axios把新数据传给后端
      this.axios
        .post(
          "http://127.0.0.1:666/commodityout/saveeditaccountinstock",
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
          .get(`http://127.0.0.1:666/commodityout/accountinstockdel?id=${id}`)
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
            .get(`http://127.0.0.1:666/commodityout/batchdelete`, {
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
      this.pageSize = val;
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
    }
  }
};
</script>
<style lang="less">
.saleslist {
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

