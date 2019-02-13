<template>
    <div class="vipnumadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会员管理</span>

            </div>
            <div class="text item">
                搜索:
                <el-input placeholder="请输入会员卡，会员名，电话手机" width="300px"></el-input>
                <el-button type="success" size="mini">查询</el-button>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="vipcardnumber" label="会员卡卡号">
                    </el-table-column>
                    <el-table-column prop="vipname" label="会员姓名">
                    </el-table-column>

                    <el-table-column prop="vipgrade" label="会员等级">
                    </el-table-column>
                    <el-table-column prop="vipintegral" label="会员积分">
                    </el-table-column>
                    <el-table-column prop="discount" label="折扣">
                    </el-table-column>
                    <el-table-column prop="phonenumber" label="手机号">
                    </el-table-column>
                    <el-table-column prop="telnumber" label="座机号">
                    </el-table-column>
                    <el-table-column label="管理">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">

                                <i class="el-icon-edit"></i>
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
      tableData: [
        {
          vipcardnumber: "51370074",
          vipname: "王雪梅",
          vipgrade: "普通会员",
          vipintegral: "237",
          discount: "10%",
          phonenumber: "15876540876",
          telnumber: "028-5483967"
        },
        {
          vipcardnumber: "51370045",
          vipname: "李梅",
          vipgrade: "白银会员",
          vipintegral: "345",
          discount: "30%",
          phonenumber: "13467852356",
          telnumber: "028-6754368"
        },
        {
          vipcardnumber: "51370026",
          vipname: "王大锤",
          vipgrade: "青铜会员",
          vipintegral: "126",
          discount: "20%",
          phonenumber: "14725683468",
          telnumber: "028-4698564"
        },
        {
          vipcardnumber: "51370189",
          vipname: "卢本伟",
          vipgrade: "黄金会员",
          vipintegral: "237",
          discount: "全免",
          phonenumber: "18945673455",
          telnumber: "028-6834678"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {}
  }
};
</script>
<style lang="less">
.vipnumadd {
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
  .el-table__header-wrapper {
    margin-top: 30px;
    border-top: 2px solid #ccc;
  }
  .el-pagination{
    //   margin-left: 40px;
      margin-top: 30px;
  }
}
</style>

