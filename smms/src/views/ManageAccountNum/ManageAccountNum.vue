<template>
  <div class="manageaccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <el-table ref="multipleTable" :data="accountTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="username" label="账号">
          </el-table-column>
          <el-table-column prop="usergroup" label="用户组">
          </el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.Ctime | filterctime }}</template>
          </el-table-column>
          <el-table-column label="操作">
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
        <!--分页-->
        <div style="margin-top: 30px; text-align: left">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 3, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <!--批量删除的按钮-->
        <div style="margin-top: 30px; text-align: left">
          <el-button @click="batchDelete">批量删除</el-button>
          <el-button @click="canselSelect()">取消选择</el-button>
        </div>
        <!--弹出模态框-->
        <el-dialog title="修改账号" :visible.sync="flag" width="350px">
          <el-form :model="editForm" label-width="60px">
            <!-- 账号 -->
            <el-form-item label="账号" prop="username">
              <el-input style="width: 217px;" type="text" v-model="editForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 选中用户组 -->
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
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
      accountTableData: [],
      flag: false,
      editForm: {
        username: "",
        usergroup: ""
      },
      editId: "",
      selectedAccount: [], //被选中的表格数据
      currentPage: 1, //当前页码
      total: 0, //数据总数
      pageSize: 3 //每页条数
    };
  },
  created() {
    //自动发送请求 获取所有用户的账户数据
    // this.getAccountList();
    this.getAccountListByPage();
  },
  methods: {
    getAccountListByPage() {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      this.axios
        .get("http://127.0.0.1:666/account/accountlistbypage", {
          params: {
            pageSize,
            currentPage
          }
        })
        .then(response => {
          let { total, data } = response.data;
          this.total = total;
          this.accountTableData = data;
          //如果当前页没有数据 且排除第一页
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getAccountListByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改数据的函数
    handleEdit(id) {
      //把修改的这一条id保存下来
      this.editId = id;

      // 显示模态框
      this.flag = true;
      this.axios
        .get(`http://127.0.0.1:666/account/accountedit?id=${id}`)
        .then(response => {
          let result = response.data[0];
          //回填数据
          (this.editForm.username = result.username);
            (this.editForm.usergroup = result.usergroup);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除数据函数
    handleDelete(id) {
      //提示框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtomText: "确定",
        cancelButtomText: "取消",
        type: "warning"
      }).then(() => {
        //发送ajax把id传给后端
        this.axios
          .get(`http://127.0.0.1:666/account/accountdel?id=${id}`)
          .then(response => {
            // console.log(response.data);
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
    saveEdit() {
      let params = {
        username: this.editForm.username,
        usergroup: this.editForm.usergroup,
        editId: this.editId
      };
      //发送axios把新数据传给后端
      this.axios
        .post(
          "http://127.0.0.1:666/account/saveeditaccount",
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
    },
    handleSelectionChange(val) {
      this.selectedAccount = val;
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
            .get(`http://127.0.0.1:666/account/batchdelete`, {
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
    }
  },
  filters: {
    //处理时间
    filterctime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.manageaccount {
  // .el-icon-edit {
  //   font-size: 20px;
  // }
  // .el-icon-info {
  //   font-size: 20px;
  // }
  
}
</style>