<template>
<div>
    <loading :active.sync="isLoading" ></loading>
    <Slider/>
    <!--coupon-->
    <section class="section bg-dark py-4 text-white">
        <div class="container">
            <div class="row justify-content-around">
              <div class="text-sm-center">
                  <div class="h4">好禮獎不完，限量 coupon 大放送</div>
                  <small>現在全站滿 10,000 元，就送 200 元禮券，不僅有延長保固服務，讓你買越多省越多。</small>
              </div>
              <div class="d-flex align-items-center">
                  <button class="px-5 btn btn-block btn-primary mt-3 mt-md-0">
                    <router-link class="btn_coupon_text" to="/discount">立即領取</router-link>
                  </button>
              </div>
            </div>
        </div>
    </section>
    <!--intro-->
  <section class="container-fluid py-0 px-0 bg-light" >
    <div class="row pd-bg bg-cover">
      <div class="col-md-6">
        <img src="../assets/images/db04.jpg" height="375" />
      </div>
      <div class="col-md-6 align-self-center mt-5 mt-md-0 ">
        <div class="row justify-content-center">
            <div class="col-md-8 text-sm-center text-md-left">
              <img src="../assets/images/divingIcon01.png" width="60">
              <h3 class="mt-3"><strong>享受 FUN 肆潛水的樂趣</strong></h3>
              <p>我們提供便利、舒適及優質的潛水配備，且同時還提供保固服務，盡情享受美好的下水體驗。</p>
              </div>
            </div>
        </div>
    </div>
  </section>
   <!--intro2-->
  <section class="container-fluid bg-light">
    <div class="row flex-row-reverse pd-bg bg-cover">
      <div class="col-md-6">
        <img src="../assets/images/db05.jpg" height="380"/>
      </div>
      <div class="col-md-6 align-self-center mt-5 mt-md-0">
        <div class="row justify-content-center">
          <div class="col-md-8 text-sm-center text-md-left">
              <img src="../assets/images/divingIcon02.png" width="60">
              <h3 class="mt-3"><strong>還在為潛水品牌而困擾嗎?</strong></h3>
              <p>在這裡不用擔心，我們有非常多的品牌供您選擇，讓你不管在哪潛水都 有 型！你還在等什麼！</p>
            </div>
          </div>
        </div>
    </div>
  </section>
  

    <div class="container mb-1">
    <!-- List group start -->
        <div class="row mt-5">
            <div class="col-md-3">
            <!-- 左側選單 (List group) -->
                <div class="list-group">
                    <a href="javascript:;" class="list-group-item list-group-item-action" 
                        v-for="item in categoryList" :key="item"  
                        @click.prevent="category = item" 
                        :class="{'active': category == item}" 
                        data-toggle="list" >
                        <i class="fa fa-anchor" aria-hidden="true"></i> {{item}}</a>
                    </a>
                </div>
            </div><!---col3-->
            <div class="col-md-9">
                <div class="tab-content">
                    <div class="tab-pane active" v-if="category == '全部商品'">
                        <Product :products="pageProduct"></Product>
                        <Pagination :pages="pagination" @emitPages="changePage"></Pagination>
                    </div><!--tab pane-->
                    <div class="tab-pane active" v-else>
                        <Product :products="products.filter(item => item.category == category)"></Product>
                    <div><!--tab pane-->

                  </div>
                 </div>
              </div><!--tabcontent-->
            </div><!--col9-->
        </div><!--row-->
    </div><!--container-->

<!--section-->
  <section class="container-fluid py-5 bg-cover pd-img">
    <div class="row">
      <div class="col-lg-6 col-sm-4">


      </div>
      <div class="col-lg-6 col-sm-8">
        <div class="bg-white p-5">
          <h2 class="section-title"><strong>關於好享潛水</strong></h2>
          <p>《好享潛水》提供國內外各大潛水勝地的潛旅套裝行程，並精心規劃主題式的行程，無論您是水下攝影愛好者、沉船探險、Fun Diving、海島潛水、船宿船潛或是綠島船潛線上訂等，我們都能提供從潛水、住宿、機票及交通等的代訂服務；此外我們也提供潛水裝備的租賃或採購服務。本公司所有的員工都有AOWD以上的資格，甚
            至親訪每一間合作的渡假村，將各地不同的體驗與客戶們分享。</p>
        </div>
      </div>
    </div>
</section>



</div>
</template>


<script>
import Slider from './pages/Slider.vue'
import Product from './pages/Product.vue'
import Pagination from './Pagination.vue'



export default {
    data () {
        return {
            category: '全部商品',
            categoryList:[],
            products: [],
            pageProduct: [],
            pagination: [],
            isLoading: false,
        }

    },
    components: {
        Slider,
        Product,
        Pagination,
    },
    methods: {
        getProductAll(){ // 取得全部產品分類
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`; 
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                if(response.data.success){
                    vm.categoryList = response.data.products.map((item) => item.category)
                    .filter((item, index, arr) => {
                    return arr.indexOf(item) === index
                    })
                    vm.categoryList.unshift('全部商品')
                    vm.products = Object.assign([], response.data.products)
                    // console.log(vm.products);
                    vm.isLoading = false;
                }
            });
        },
        getPageProduct (page = 1) { // 取得每頁產品分類
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; 
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.pageProduct = Object.assign([], response.data.products)
                    vm.pagination = Object.assign([], response.data.pagination)
                    vm.isLoading = false;
                }
            })
        },
        changePage (data) {
        this.getPageProduct(data)
      },

    },
    created(){
        this.getProductAll();
        this.getPageProduct();
    },

}


</script>


<style lang="scss">

.bg-cover{
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.pd-img{
  background:url('../assets/images/db03.jpg');
}

.pd-bg{
  background:url('../assets/images/db_bg.jpg');
}

@media (min-width:768px){
  .text-md-left{
    text-align:left ;
  }
}
@media (max-width:768px){
  .text-sm-center{
    text-align:center !important;
  }
}

.btn{
  .btn_coupon_text{
    color:#fff;
  }
}

a:hover{
  text-decoration:none;
}

</style>