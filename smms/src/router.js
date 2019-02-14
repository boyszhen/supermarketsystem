import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component : ()=>import('./views/Login/Login.vue')
    },
      {
        path:'/',
        component : ()=> import('./views/Index/Index.vue'),
        children : [
            //系统信息
            {
                path : '',
                component : ()=> import('./views/Home/Home.vue')
            },
            //会员管理部分  账号管理
            {
                path : '/accountmanage',
                name : 'accountmanage',
                component : ()=> import('./views/AccountManage/AccountManage.vue')
            },
            //会员管理部分  添加账号
            {
                path : '/accountadd',
                name : 'accountadd',
                component : ()=> import('./views/AccountAdd/AccountAdd.vue')
            },
            //账号管理部分 账号管理
            {
                path : '/manageaccountnum',
                name : 'manageaccountnum',
                component : ()=>import('./views/ManageAccountNum/ManageAccountNum.vue')
            },
            //账号管理部分  添加账号
            {
                path : '/addaccountnum',
                name : 'addaccountnum',
                component : ()=>import('./views/AddAccountNum/AddAccountNum.vue')
            },
            //修改密码
            {
                path : '/passwordmodify',
                name : 'passwordmodify',
                component : ()=>import('./views/PasswordModify/PasswordModify.vue')
            },
            //销售统计
            {
                path : '/salesstatistics',
                name : 'salesstatistics',
                component : ()=>import('./views/SalesStatistics/SalesStatistics.vue')
            },
            //进货统计
            {
                path : '/incomingstatistics',
                name : 'incomingstatistics',
                component : ()=>import('./views/IncomingStatistics/IncomingStatistics.vue')
            },
            //销售列表
            {
                path : '/saleslist',
                name : 'saleslist',
                component : ()=>import('./views/SalesList/SalesList.vue')
            },
            //商品出库
            {
                path : '/goodsgoout',
                name : 'goodsgoout',
                component : ()=>import('./views/GoodsGoOut/GoodsGoOut.vue')
            },
            //商品退货
            {
                path : '/goodsreturn',
                name : 'goodsreturn',
                component : ()=>import('./views/GoodsReturn/GoodsReturn.vue')
            },
            //库存管理
            {
                path : '/inventorymanage',
                name : 'inventorymanage',
                component : ()=>import('./views/InventoryManage/InventoryManage.vue')
            },
            //添加库存
            {
                path : '/inventoryadd',
                name : 'inventoryadd',
                component : ()=>import('./views/InventoryAdd/InventoryAdd.vue')
            },
            //商品管理
            {
                path : '/goodsmanage',
                name : 'goodsmanage',
                component : ()=>import('./views/GoodsManage/GoodsManage.vue')
            },
            //添加商品
            {
                path : '/goodsadd',
                name : 'goodsadd',
                component : ()=>import('./views/GoodsAdd/GoodsAdd.vue')
            }
        ]
      }
  ]
})
