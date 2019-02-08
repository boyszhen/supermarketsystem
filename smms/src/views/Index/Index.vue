<template>
    <div class="home">
        <el-container>
            <!--头部-->
            <el-header>
                <Top></Top>
            </el-header>
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
                    <el-footer>
                        <Footer></Footer>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import Nav from '@/components/Nav/Nav.vue';
    import Top from '@/components/Top/Top.vue';
    import Footer from '@/components/Footer/Footer.vue'
    export default {
        components : {
            Nav,
            Top,
            Footer
        }

    }
</script>
<style lang="less">
    .home{
        height: 100%;
        .el-container{
            height: 100%;
            .el-header,.el-footer,.el-main{
                width: 100%;
                background-color: #242f42;
            }
            .el-main {
                background-color: #E9EEF3;
            }
        }

    }

</style>