<template>

    <div class="top">
        <el-row>
            <el-col :span="12" class="title">
                <i class="el-icon-menu"></i> 华联超市管理系统
            </el-col>
            <el-col :span="12" class="welcome">
                <el-row>
                    <el-col :span="18">
                        欢迎您!
                        <el-dropdown>
                            <span class="username el-dropdown-link">
                                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="6">
                        <div class="avatar">
                            <img width="100%" height="100%" src="./via.jpg" alt="">
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        data (){
            return {
                username : "李寻欢"
            }
        }
    }
</script>
<style lang="less">
    .top{
        color: #fff;
        line-height: 60px;
        .el-row{
            .title{
                font-size: 22px;
                letter-spacing: 5px;
            }
            .welcome{
                text-align: right;
                .el-row{
                    .el-col{
                        .el-dropdown{
                            .username{
                                color: #fff;
                            }
                        }
                    }
                }

                .avatar {
                    width: 52px;
                    height: 52px;
                    margin-top: 4px;
                    margin-left: 30px;
                    border-radius: 50%;
                    img {
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>