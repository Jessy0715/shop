// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//第三方套件
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';


//自定義
import App from './App';
import router from './router';
import store from './store/store';
import './bus'; 
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import VeeValidate, { Validator } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW';  
// import VueI18n from 'vue-i18n';Vue.use(VueI18n);


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.use(VeeValidate);  //啟用API
Validator.localize('zh-TW', TW);  //啟用語言包
// const i18n = new VueI18n({
//   locale: 'zhTW'
// });
// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// });

Vue.component('Loading', Loading); //因為有loading 元件，需要被啟用
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;  //cookie
/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach( (to,from,next)=>{
  console.log('to', to, 'from',from, 'next', next);
  if(to.meta.requiresAuth){
    // console.log('這裡需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then( ( response ) => {  //this.$http (元件內)換成 axios，
        console.log(response.data);
        if (response.data.success){
            next();
        }else{
          next({
            path:'/login',
          })
        }
    });


  }else{
    next(); 
  }
});

