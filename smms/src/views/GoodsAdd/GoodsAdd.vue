<template>
  <div class="goodsadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>

      </div>
      <div class="text item">
        <el-form :model="goodsAddForm" status-icon :rules="rules" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属分类：" prop="classification">
            <el-select v-model="goodsAddForm.classification" placeholder="--请选择分类--">
              <el-option label="烟酒" value="烟酒"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="粮油" value="粮油"></el-option>
              <el-option label="干货" value="干货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品条形码:" prop="productbarcode" class="max">
            <el-input type="text" v-model="goodsAddForm.productbarcode" autocomplete="off" placeholder="请输入条形码"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：" prop="goodsname" class="max">
            <el-input type="text" v-model="goodsAddForm.goodsname" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品售价：" prop="saleprice" class="mini">
            <el-input type="text" v-model="goodsAddForm.saleprice" autocomplete="off" placeholder="商品售价"></el-input>
          </el-form-item>
          <el-form-item label="市场价：" prop="marketprice" class="mini">
            <el-input type="text" v-model="goodsAddForm.marketprice" autocomplete="off" placeholder="市场价"></el-input>
          </el-form-item>
          <el-form-item label="商品进价：" prop="goodspurchase" class="mini">
            <el-input type="text" v-model="goodsAddForm.goodspurchase" autocomplete="off" placeholder="商品进价"></el-input>
          </el-form-item>
          <el-form-item label="入库数量：" prop="warehnumber" class="mini">
            <el-input type="text" v-model="goodsAddForm.warehnumber" autocomplete="off" placeholder="入库数量"></el-input>
          </el-form-item>
          <el-form-item label="商品重量：" prop="goodsweight" class="mini">
            <el-input type="text" v-model="goodsAddForm.goodsweight" autocomplete="off" placeholder="商品重量"></el-input>
          </el-form-item>
          <el-form-item label="商品单位：" prop="goodsunit" class="mini">
            <el-input type="text" v-model="goodsAddForm.goodsunit" autocomplete="off" placeholder="商品单位"></el-input>
          </el-form-item>
          <el-form-item label="会员优惠：" prop="memberdiscount" class="vipsale">
            <el-radio-group v-model="goodsAddForm.memberdiscount">
              <el-radio :label="1">享受</el-radio>
              <el-radio :label="2">不享受</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否促销：" prop="ispromo">
            <el-radio-group v-model="goodsAddForm.ispromotion">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品简介：" prop="productdiscription">
            <el-input type="textarea" :rows="2" placeholder="不超过二十字" v-model="goodsAddForm.productdiscription">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini" @click="submitForm('goodsAddForm')">添加</el-button>
          </el-form-item>
        </el-form>
       
      </div>
    </el-card>
  </div>
</template>
<script>
  import qs from "qs";
export default {
  data() {
    return {
      goodsAddForm: {
        classification: "",
        productbarcode: "",
        goodsname: "",
          saleprice: "",
        marketprice: "",
        goodspurchase: "",
        warehnumber: "",
        goodsweight: "",
        goodsunit: "",
        memberdiscount: "",
          ispromotion: "",
        productdiscription: ""
      },
      rules: {
        classification: [
          { required: true, message: "请选择商品种类", trigger: "blur" }
        ],
        productbarcode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
          saleprice: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
          marketprice : [
              {required : true,message : "请输入市场价",trigger : "blur"}
          ],
          warehnumber : [
              {required : true ,message : "请输入数量",trigger : "blur"}
          ]
      }
    };
  },
    methods : {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let stockprice = Number(this.goodsAddForm.warehnumber) * Number(this.goodsAddForm.saleprice);
                    //是否促销
                    let ispromotion = "";
                    if (this.goodsAddForm.ispromotion === 1){
                        ispromotion = "促销"
                    }else{
                        ispromotion = "未促销"
                    }
                   let params = {
                        //条形码
                       goodbarcode : this.goodsAddForm.productbarcode,
                       //商品名称
                       goodname : this.goodsAddForm.goodsname,
                       //商品类别
                       goodclass : this.goodsAddForm.classification,
                       //售价
                       saleprice : this.goodsAddForm.saleprice,
                       // 市场价格
                       marketprice: this.goodsAddForm.marketprice,
                       //入库数量
                       instock:this.goodsAddForm.warehnumber,
                       //库存总额
                       stockprice,
                       //是否促销
                       ispromotion
                   };
                   //发送请求
                    this.axios.post("http://127.0.0.1:888/goods/goodsadd",qs.stringify(params))
                        .then(response => {
                            console.log(response.data)
                        })
                        .catch(err => {
                            if (err) throw err
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="less">
.goodsadd {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background: #f1f1f1;
    }
    .text {
      .el-form {
        width: 300px;
        .max {
          width: 350px;
        }
        .mini {
          width: 200px;
        }
        .el-form-item {
          .el-form-item__content {
            .el-button {
              margin-left: -80px;
            }
            .el-radio-group {
              margin-left: 0px;
            }
            .el-select {
              .el-input {
                .el-input__inner {
                  text-align: center;
                  width: 150px;
                  margin-left: 0px;
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
