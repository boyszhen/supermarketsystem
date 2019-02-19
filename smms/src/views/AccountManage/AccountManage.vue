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
                <el-table  :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="vipnumber" label="会员卡卡号">
                    </el-table-column>
                    <el-table-column prop="username" label="会员姓名">
                    </el-table-column>

                    <el-table-column prop="userGrade" label="会员等级">
                    </el-table-column>
                    <el-table-column prop="integral" label="会员积分">
                    </el-table-column>
                    <el-table-column prop="discount" label="折扣">
                    </el-table-column>
                    <el-table-column prop="phonenumber" label="手机号">
                    </el-table-column>
                    <el-table-column prop="phonenumber" label="座机号">
                    </el-table-column>
                    <el-table-column label="管理">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="vipEdit(scope.row.id)">
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <el-button type="danger" size="mini" @click="vipDelete(scope.row.id)">
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
                <el-button type="danger" @click="batchDelete">批量删除</el-button>
                <el-dialog title="修改会员信息" :visible.sync="flag">
                    <el-form :model="form">
                        <el-form-item label="会员名称" :label-width="formLabelWidth">
                            <el-input v-model="form.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="会员卡号" :label-width="formLabelWidth">
                            <el-input v-model="form.vipnumber" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" :label-width="formLabelWidth">
                            <el-input v-model="form.phonenumber" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="会员积分" :label-width="formLabelWidth">
                            <el-input v-model="form.integral" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="会员等级" :label-width="formLabelWidth">
                            <el-select v-model="form.userGrade" placeholder="请选择会员等级">
                                <el-option label="普通会员15%" value="普通会员15%"></el-option>
                                <el-option label="青铜会员20%" value="青铜会员20%"></el-option>
                                <el-option label="白银会员30%" value="白银会员30%"></el-option>
                                <el-option label="黄金会员40%" value="黄金会员40%"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="flag = false">取 消</el-button>
                        <el-button type="primary" @click="saveVipEdit">确 定</el-button>
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
                tableData: [],
                flag : false,
                form : {
                    username : "",
                    userGrade : "",
                    vipnumber : "",
                    phonenumber : "",
                    integral : "",
                    discount : "",
                    editId : ""
                },
                formLabelWidth : "120px",
                //批量删除id
                batchId : [],
                currentPage : 1,
                pageSize : 3,
                total : 0

            };
        },
        created (){
            this.getVipListByPage();
        },
        methods: {
            //获取会员列表数据
            // getVipList (){
            //     this.axios.get("http://127.0.0.1:888/vip/viplist")
            //         .then(response =>{
            //             this.tableData = response.data;
            //         })
            //         .catch(err=> {
            //
            //         })
            // },
            //根据页码和每页数据条数获取数据函数
            getVipListByPage(){
                //发送数据给后端
                this.axios.get("http://127.0.0.1:888/vip/vipByPage",{
                    params : {
                        currentPage : this.currentPage,
                        pageSize : this.pageSize
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
            handleSelectionChange(val) {
                this.batchId = val;
            },
            // 每页条数改变
            handleSizeChange(val) {
                this.pageSize = val;
                this.getVipListByPage();
            },
            //页码改变
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getVipListByPage();
            },
            //删除会员函数
            vipDelete (id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get(`http://127.0.0.1:888/vip/vipdelete?id=${id}`)
                        .then(response => {
                            let {err_code,reason} = response.data;
                            if (err_code === 0){
                                this.$message({
                                    type: 'success',
                                    message: reason
                                });
                                this.getVipListByPage();
                            } else {
                                this.$message.error(reason)
                            }
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //会员编辑函数
            vipEdit (id) {
                this.flag = true;
                this.axios.get(`http://127.0.0.1:888/vip/backfill?id=${id}`)
                    .then(response => {
                        this.form.username = response.data[0].username;
                        this.form.vipnumber = response.data[0].vipnumber;
                        this.form.phonenumber = response.data[0].phonenumber;
                        this.form.integral = response.data[0].integral;
                        this.form.editId = response.data[0].id;
                        this.form.userGrade = response.data[0].userGrade + response.data[0].discount;
                    })
                    .catch(err => {
                        if (err) throw err;
                    })
            },
            //保存修改函数
            saveVipEdit (){
                let userGrade = this.form.userGrade.substr(0,4);
                let discount = this.form.userGrade.substr(4);
                let parms = {
                    username : this.form.username,
                    vipnumber : this.form.vipnumber,
                    phonenumber : this.form.phonenumber,
                    integral : this.form.integral,
                    userGrade,
                    discount,
                    editId : this.form.editId
                };
                this.axios.post("http://127.0.0.1:888/vip/savevipedit",qs.stringify(parms))
                    .then(response => {
                        let {err_code,reason} = response.data;
                        if (err_code === 0){
                            this.$message({
                                type : "success",
                                message : reason
                            });
                            this.getVipListByPage();
                            this.flag = false;
                        } else {
                            this.$message.error(reason);
                        }
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
            //批量删除函数
            batchDelete (){
                let selectId = this.batchId.map(item => item.id);
                if (selectId.length>0) {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.get(`http://127.0.0.1:888/vip/batchdelete?id=${selectId}`)
                            .then(response => {
                                let {err_code, reason} = response.data;
                                if (err_code === 0) {
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                    this.getVipListByPage();
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
                        /*width: 50px;*/
                        height: 40px;
                        margin-left: 10px;
                        border-radius: 7px;
                    }
                    .el-button--danger{
                        margin-top: 20px;
                    }
                    .el-pagination{
                        .el-pagination__sizes{
                            .el-select{
                                .el-input{
                                    width: 100px;
                                }
                            }
                        }
                        .el-pagination__jump{
                            .el-input{
                                width: 40px;
                            }
                        }
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

