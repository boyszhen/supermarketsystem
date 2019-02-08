<template>
    <div class="home">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div class="text">
                <!--提示信息-->
                <el-alert
                        title="商品总数"
                        type="info"
                        description="总数是:5 已销售的金额:890.00 库存商品总价:1235.82"
                        show-icon>
                </el-alert>
                <!--导入数据-->
                <el-alert
                        title="导入数据"
                        type="success"
                        show-icon>
                </el-alert>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <el-table
                                            :data="sellData"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="goodsName"
                                                label="商品名">
                                        </el-table-column>
                                        <el-table-column
                                                prop="sellNum"
                                                label="销量">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <div class="grid-content bg-purple">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>缺货商品</span>
                                    </div>
                                    <div class="text item">
                                        <el-table
                                                :data="stockoutData"
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="goodsName"
                                                    label="商品名称">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="inventory"
                                                    label="库存">
                                            </el-table-column>
                                            <el-table-column
                                                    label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" size="small">入库</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                //销量排行数据
                sellData : [
                    {
                        goodsName : "海飞丝",
                        sellNum : 6
                    },
                    {
                        goodsName : "茅台酒",
                        sellNum : 5
                    },
                    {
                        goodsName : "霸王",
                        sellNum : 10
                    },
                    {
                        goodsName : "广州好迪",
                        sellNum : 6
                    },
                    {
                        goodsName : "飘柔",
                        sellNum : 6
                    }
                ],
            //    缺货商品数据
                stockoutData : [
                    {
                        goodsName : "我的优乐美",
                        inventory : 0
                    },
                    {
                        goodsName : "你的益达",
                        inventory : 1
                    },
                    {
                        goodsName : "我的哇哈哈",
                        inventory : 2
                    },
                    {
                        goodsName : "我的优乐美",
                        inventory : 3
                    }
                ]

            }
        }
    }
</script>
<style lang="less">
    .home{
        border: 1px solid #ccc;
        .el-card{
            .el-card__header{
                border-bottom: 1px solid #ccc;
                font-size: 18px;
                font-weight: 700;
                background: #e9e9e9;
            }
            .el-card__body{
                .el-alert{
                    margin-bottom: 10px;
                    .el-alert__icon{
                        font-size: 16px;
                        width: 15px;
                    }
                }
                .text{
                    .el-row{
                        margin-top: 50px;
                    }
                }
            }
        }
    }
</style>