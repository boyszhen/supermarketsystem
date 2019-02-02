<template>
    <div class="home">
        <el-container>
            <!--头部-->
            <el-header>Header</el-header>
            <!--内容部分-->
            <el-container>
                <!--侧边栏-->
                    <Nav></Nav>
                <el-container>
                    <!--主内容部分-->
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <!--尾部-->
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import Nav from '@/components/Nav/Nav.vue';
    export default {
        components : {
            Nav : Nav
        }

    }
</script>
<style lang="less">
    .home{
        height: 100%;
        .el-container{
            height: 100%;
            .el-header, .el-footer {
                background-color: #B3C0D1;
                color: #333;
                text-align: center;
                line-height: 60px;
            }



            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
                line-height: 160px;
            }
        }

    }

</style>