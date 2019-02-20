<template>
<<<<<<< HEAD
    <div class="salesstatistics">
        <el-card class="box-card">
=======
    <div class="SaleStatistics">
        <!-- 面板组件 -->
       <el-card class="box-card">
>>>>>>> 43be32b5eeded710f3af9126857135ba8f5c14e4
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>
            <div class="text item">
<<<<<<< HEAD
                <div id="main" style="width: 600px;height: 400px;">

                </div>
=======
                <!-- 报表容器 -->
                <div id="main" style="height:400px"></div>
>>>>>>> 43be32b5eeded710f3af9126857135ba8f5c14e4
            </div>
        </el-card>
    </div>
</template>
<script>
<<<<<<< HEAD
    import echarts from "echarts";
    export default {
        mounted (){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
=======
// 引入moment
import moment from "moment";
// 引入echarts
import echarts from 'echarts';

export default {
    // 这个生命周期可以获取dom
    mounted () {
        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(document.getElementById('main'));

        // 配置对象 （关键就是发送ajax请求 获取到后端数据 使用后端数据 来修改这份配置）
        var option = {
            tooltip: {
                show: true
            },
            legend: {
                data:['销量'],
                data:['总价']
            },
            xAxis : [
                {
                    type : 'category',
                    data : ["1月","2月","3月","4月","5月","6月", "7月"]
                },
                 {
                    type : 'category',
                    data : ["1月","2月","3月","4月","5月","6月", "7月"]
                }
            ],
            yAxis : [
                {
                    type : 'value'
                },
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":[] // 没有数据
                },
                {
                    "name":"总价",
                    "type":"bar",
                    "data":[] // 没有数据
                }
            ]
        }

        // 为echarts对象加载数据 
        myChart.setOption(option);  
        
        // 发送ajax给后端 获取到一份销量数据
        let sales = [100, 50, 160, 38, 56, 99, 10];
        let price = [1230, 52340, 123460, 23438, 5234, 23499, 12340];
        
        myChart.setOption({  // 发送请求到后端获取数据 只需要重新 setOption 即可。
             series : [
                {
                    "name":"销量",
                    "data":sales
                },
                {
                    "name":"总价",
                    "data":price
                }
            ]
        })
>>>>>>> 43be32b5eeded710f3af9126857135ba8f5c14e4

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
};
</script>
<style lang="less">
<<<<<<< HEAD
    .salesstatistics{
        .el-card{
            .el-card__header{
                text-align: left;
                font-size: 20px;
                font-weight: 600;
                background: #f1f1f1;
            }
        }
    }
</style>
=======
.SaleStatistics {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>


>>>>>>> 43be32b5eeded710f3af9126857135ba8f5c14e4
