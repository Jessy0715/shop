<template>
<div class="container">
<loading :active.sync="isLoading" ></loading>
    <div class="row justify-content-center">
        <div class="col-md-8">
	<!-- Start Section -->
            <section class="fact-area section-gap-top">
                    <div class="fact-box">
                        <div class="row align-items-center">
                            <div class="col single-fact">
                                <h2>STEP 1</h2>
                                <p>輸入訂單資料</p>
                            </div>
                            <div class="col single-fact" :class="{'active': !order.is_paid}">
                                <h2>STEP 2</h2>
                                <p>金流付款</p>
                            </div>
                            <div class="col single-fact" :class="{'active': order.is_paid}">
                                <h2>STEP 3</h2>
                                <p>完成</p>
                            </div>
                        </div>
                    </div>
            </section>
   </div><!--colmd8--> 
</div><!--row-->
<div class="w-100"></div>

  <div class="row justify-content-center">
  <div class="col-md-8">
    <h2 class="payment-title mt-4 mb-3 h5 font-weight-bold">
      <span class="icon">
        <i class="far fa-file-alt"></i>
      </span> 購買資訊
    </h2>
    <table class="table table-sm table-striped shadow-sm">
      <thead class="bg-primary text-white">
      <tr class="h6">
        <th class="py-2">商品資訊</th>
        <th class="py-2">數量</th>
        <th class="text-right py-2">金額</th>
      </tr>
      </thead>
      <tbody class="h6">
        <tr  v-for="item in order.products" :key="item.id">
          <td class="align-middle">
            <div  class="cart-title">{{item.product.title}}</div>
            <small class="mt-2 text-danger" v-if="item.final_total !== item.total">已套用優惠券</small>
          </td>
          <td class="align-middle  ">
            <div class="cart-unit">{{item.qty}} / {{item.product.unit}}</div>
          </td>
          <td class="align-middle text-right  ">
            <div :class="{'old-totalPrice': item.final_total !== item.total}">{{item.total | currency}}</div>
            <div class="mt-2 text-danger" v-if="item.final_total !== item.total">{{item.final_total | currency}}</div>
          </td>
        </tr>
      </tbody>

    </table>
    <div class=" d-flex justify-content-end align-items-baseline px-2 pt-2">
        <span class="pr-3 font-weight-bold">總計</span>
        <span v-if="order.total" class="h4 text-info">{{order.total | currency}}</span>
      </div>
    </div>
  <div class="col-md-8">
  <hr class="my-4">
    <h2 class="payment-title mb-3 mt-5 h5 font-weight-bold">
      <span class="icon">
        <i class="far fa-paper-plane"></i>
      </span>  個人資訊
    </h2>
    <table class="table table-striped shadow-sm">
    <thead>
      <tr class="bg-primary text-white h6">
      <th class="py-2" colspan="2">訂單資料</th>
      </tr>
    </thead>
    <tbody class="h6">
      <tr >
        <td class="text-dark">姓名</td>
        <td v-if="order.user">{{order.user.name}}</td>
      </tr>
      <tr>
        <td  class="text-dark">電話</td>
        <td v-if="order.user">{{order.user.tel}}</td>
      </tr>
      <tr>
        <td  class="text-dark">Email</td>
        <td v-if="order.user">{{order.user.email}}</td>
      </tr>
      <tr>
        <td  class="text-dark">地址</td>
        <td v-if="order.user">{{order.user.address}}</td>
      </tr>
      <tr>
        <td  class="text-dark">付款狀態</td>
        <td v-if="order.user">
          <span v-if="!order.is_paid" class="text-danger font-weight-bold">尚未付款</span>
          <span v-else class="text-success font-weight-bold">已完成付款</span>
        </td>
      </tr>
    </tbody>
    </table>

    <button v-if="!order.is_paid"  @click="payOrder" class="float-right mb-4 btn btn-danger text-white ">確認付款</button>
    <router-link to="/" v-else    class="float-right mb-4 btn btn-primary text-white "><i class="fas fa-caret-left"></i> 繼續購物</router-link>
 </div>
  </div>









</div><!--container-->
</template>
<script>
export default {
    data () {
        return{
            isLoading: false,
            order: {
                user: {}, 
            },
            orderId: '',
        }

    },
    methods: {
         getOrder () {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            // vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                vm.isLoading = false;
                if (response.data.success) {
                    vm.order = response.data.order;
                }
            });
         },
         payOrder () {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.isLoading = true;
            this.$http.post(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.getOrder();
                }
                vm.isLoading = false;

            });
         },
    },
    created () {
        this.orderId = this.$route.params.orderId; 
        this.getOrder();
    },

}

</script>
<style lang="scss" scoped>

.fact-area {
    .fact-box {
        box-shadow: 0px 20px 50px rgba(153, 153, 153, 0.20);
    }
}

.single-fact {
    color:#ccc;
    text-align: center;
    margin: 45px 0;
    padding: 8px 8px;
    border-right: 1px solid #ddd;
    @media (max-width: 991px) {
        margin: 10px 0;
        padding: 8px 16px;
    }
    &.active{
        color:#000;
    }
    &:last-child {
        border-right: 0;
    }
    h2 {
        font-size: 36px;
        margin-bottom: 5px;
        @media (max-width: 991px) {
            font-size: 25px;
        }
    }
    p {
        margin: 0;
        font-size: 14px;
    }
}

.section-gap-top {
    padding-top: 50px;
    @media (max-width: 991px) {
        padding-top: 70px;
    }
}

.old-totalPrice{
  text-decoration: line-through;
}

</style>