<template>
    <div class="manageaccount">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <el-table
                        :data="userData"
                        style="width: 100%">
                    <el-table-column
                            prop="username"
                            label="用户名称">
                    </el-table-column>
                    <el-table-column
                            prop="userGroup"
                            label="用户组">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="管理">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <el-button type="text" size="small">
                                <i class="el-icon-info"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                userData : [
                    {
                        username : "admin",
                        userGroup : "超级管理员"
                    }
                ]
            }
        }
    }
</script>
<style lang="less">
    .manageaccount{
        .el-icon-edit{
            font-size: 20px;
        }
        .el-icon-info{
            font-size: 20px;
        }
    }
</style>