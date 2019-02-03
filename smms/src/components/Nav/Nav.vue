<template>
    <div class="nav">
        <el-aside width="200px">
            <el-menu
                    background-color="#324157"
                    text-color="#b2b1c0"
                    unique-opened
                    active-text-color="rgb(64,158,255)"
                    :default-active="this.$route.path"
                    router
            >
                <!--系统管理-->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">系统信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!--会员管理-->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-service"></i>
                        <span>会员管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/accountmanage">账号管理</el-menu-item>
                        <el-menu-item index="/accountadd">添加账号</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!--账号管理-->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                        <span>账号管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/manageaccountnum">账号管理</el-menu-item>
                        <el-menu-item index="/addaccountnum">添加账号</el-menu-item>
                        <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!--统计管理-->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-date"></i>
                        <span>统计管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/salesstatistics">销售统计</el-menu-item>
                        <el-menu-item index="/incomingstatistics">进货统计</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!--出货管理-->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-printer"></i>
                        <span>出货管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/saleslist">销售列表</el-menu-item>
                        <el-menu-item index="/goodsgoout">商品出库</el-menu-item>
                        <el-menu-item index="/goodsreturn">商品退货</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!--进货管理-->
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>进货管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/inventorymanage">库存管理</el-menu-item>
                        <el-menu-item index="/inventoryadd">添加库存</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <!--商品管理-->
                <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
                        <el-menu-item index="/goodsadd">添加商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-aside>

    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="less">
    .nav{
        width: 200px;
        .el-aside {
            color: #333;
            text-align: center;
            line-height: 200px;
            height: 100%;
            .el-menu{
                height: 100%;
                .el-menu-item{
                    min-width: 199px;
                }
            }
        }
    }
</style>