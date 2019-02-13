<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <div class="text item">
                <el-form :model="password" status-icon :rules="rules" ref="password" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPass">
                        <el-input type="password" v-model="password.oldPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPass">
                        <el-input type="password" v-model="password.newPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="againNewPass">
                        <el-input type="password" v-model="password.againNewPass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('password')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.password.newPass !== '') {
                        if (this.password.newPass === this.password.oldPass){
                            callback(new Error('新密码不能和旧密码一致'))
                        }
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.password.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                password: {
                    oldPass: '',
                    newPass:'',
                    againNewPass:''
                },
                rules: {
                    oldPass: [
                        { required : true, message : "请输入原密码", trigger: 'blur' },
                    ],
                    newPass: [
                        { required : true, validator: validatePass, trigger: 'blur' }
                    ],
                    againNewPass: [
                        { required : true, validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('修改成功!');
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
    .passwordmodify{
        .el-card{
            border: 1px solid #ccc;
            .el-card__body{
                .text{
                    width: 350px;
                    .el-form{
                        .el-form-item{
                            .el-form-item__content{
                                .el-input{
                                    .el-input__inner{
                                        height: 30px;
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