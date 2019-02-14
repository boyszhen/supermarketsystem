<template>
    <div class="saleslist">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售明细</span>
            </div>
            <!--查询部分表单-->
            <div class="text item">
                <el-form :model="inquire" status-icon :rules="rules" ref="inquire" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开始时间" prop="begin">
                                <el-input type="text" v-model="inquire.begin" autocomplete="off" placeholder="格式为 2019-01-01"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="结束时间" prop="over">
                                <el-input type="text" v-model="inquire.over" autocomplete="off" placeholder="格式为 2019-01-01"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="关键字" prop="key">
                                <el-input v-model="inquire.key" placeholder="海飞丝"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-button type="primary">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!--分割线-->
            <div class="line">
            </div>
            <!--内容部分-->
            <el-table
                    :data="listData"
                    style="width: 100%">
                <el-table-column
                        prop="orderNum"
                        label="订单号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="实际售价">
                </el-table-column>
                <el-table-column
                        prop="discounts"
                        label="优惠(促销/会员)">
                </el-table-column>
                <el-table-column
                        prop="refund"
                        label="退款">
                </el-table-column>
                <el-table-column
                        prop="sellTime"
                        label="销售时间">
                </el-table-column>
            </el-table>
            <el-pagination
                    small
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            var dateCheck = (rule,value,callback) => {
              //定义正则
              let re = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
              if (!re.test(value)){
                  callback(new Error("请输入正确格式的时间"));
              }else {
                  callback();
              }
            };
            return {
                inquire : {
                    begin : "",
                    over : "",
                    key : ""
                },
                listData: [{
                    orderNum : '00123456',
                    name : "海飞丝",
                    num : "22",
                    price : "48",
                    discounts : "2.00元/无",
                    refund : "无退款",
                    sellTime : "2012-02-10"
                },{
                    orderNum : '00123456',
                    name : "海飞丝",
                    num : "22",
                    price : "48",
                    discounts : "2.00元/无",
                    refund : "无退款",
                    sellTime : "2012-02-10"
                },{
                    orderNum : '00123456',
                    name : "海飞丝",
                    num : "22",
                    price : "48",
                    discounts : "2.00元/无",
                    refund : "无退款",
                    sellTime : "2012-02-10"
                }, {
                        orderNum : '00123456',
                        name : "海飞丝",
                        num : "22",
                        price : "48",
                        discounts : "2.00元/无",
                        refund : "无退款",
                        sellTime : "2012-02-10"
                    }
                ],
                rules: {
                    begin : [
                        { required : true,message : "请输入开始时间", trigger : "blur" },
                        { validator : dateCheck ,trigger : "blur" }
                    ],
                    over : [
                        { required : true,message : "请输入结束时间",trigger : "blur" },
                        { validator : dateCheck ,trigger : "blur" }
                    ],
                    key : [
                        { required : true,message : "请输入关键字",trigger : "blur" }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    .saleslist{
        .el-card{
            .el-card__body{
                .text{
                    /*width: 600px;*/
                    .el-form{
                        .el-row{
                            margin-top: 10px;
                            .el-col{
                                width: 350px;
                                .el-form-item{
                                    .el-form-item__content{
                                        .el-input{
                                            width: 240px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .line{
                    height: 1px;
                    border: 1px solid #ccc;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
                .el-pagination{
                    margin-top: 20px;
                    margin-bottom: 20px;
                    .el-icon{
                        font-size: 20px;
                    }
                    .el-pager li{
                        font-size: 16px;
                    }

                }
            }
        }
    }
</style>