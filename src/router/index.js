import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Products from '@/components/Products.vue';
import singleProduct from '@/components/pages/singleProduct.vue';
import Checkout from '@/components/pages/Checkout.vue';
import Discount from '@/components/pages/Discount.vue';
import Payment from '@/components/pages/Payment.vue';
import Login from '@/components/pages/Login';


import Dashboard  from '@/components/Dashboard';
import Items from '@/components/admin/Items';
import Coupons from '@/components/admin/Coupons';
import Orders from '@/components/admin/Orders';



Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path:'*',        
      redirect:'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '',
          name: 'products',
          component: Products,
        },
        {
          path: 'products/:product_id',
          name: 'singleProduct',
          component: singleProduct,
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: Checkout,
        },
        {
          path: 'discount',
          name: 'Discount',
          component: Discount,
        },
        {
          path: 'payment/:orderId',
          name: 'Payment',
          component: Payment,
        },
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      // meta:{requiresAuth:true}, //路由訊息，判斷基準
      children:[
        {
          path: 'items',
          name: 'Items',
          component: Items,
          meta:{requiresAuth:true},
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },    
      ],
    },
  ],
});
