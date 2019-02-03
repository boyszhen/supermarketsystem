<template>
    <div class="top">
        <div class="topBox">
            <div class="title">
                <i class="el-icon-menu"></i>
                <span>华联超市管理系统</span>
            </div>
        </div>
        <div class="contentBox">
            <span>欢迎您 </span>
            <span class="username">{{ user.name }}</span>
        </div>
        <div class="viaBox">
            <img src="./via.jpg" alt="" class="img">
        </div>

    </div>
</template>
<script>
    export default {
        data (){
            return {
                user : {
                    name : '李寻欢'
                }
            }
        }
    }
</script>
<style lang="less">
    .top{
        padding: 0;
        background-color: #242f42;
        height: 60px;
        color: #fff;
        .topBox{
            float: left;
            .title{
                font-size: 22px;
                line-height: 60px;
                margin-left: 50px;
                letter-spacing: 20px;
            }
        }
        .contentBox{
            float: left;
            height: 60px;
            line-height: 60px;
            margin-left: 1200px;
            .username{
                font-size: 18px;
            }
        }
        .viaBox{
            display:inline-block;
            margin-top: 5px;
            margin-left: 10px;
            height: 50px;
            width: 50px;
            background-color: red;
            .img{
                height: 100%;
                width: 100%;
                border-radius:50%;
            }
        }

    }
</style>