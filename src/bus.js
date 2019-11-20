import Vue from 'vue';

Vue.prototype.$bus = new Vue();  //掛載到 vue 的原型下，可以對 bus做呼叫

// Message
// vm.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式