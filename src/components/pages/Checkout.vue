<template>

<div class="container">
<div>
<Alert></Alert>
</div>
<loading :active.sync="isLoading" ></loading>
    <div class="row justify-content-center">
        <div class="col-md-8">
	<!-- Start Section -->
            <section class="fact-area section-gap-top">
                    <div class="fact-box">
                        <div class="row align-items-center">
                            <div class="col single-fact active">
                                <h2>STEP 1</h2>
                                <p>輸入訂單資料</p>
                            </div>
                            <div class="col single-fact">
                                <h2>STEP 2</h2>
                                <p>金流付款</p>
                            </div>
                            <div class="col single-fact">
                                <h2>STEP 3</h2>
                                <p>完成</p>
                            </div>
                        </div>
                    </div>
            </section>
   </div><!--colmd8--> 

   <!--section-->
        <section class="container my-lg-6 mt-5">
            <div class="row">
                <div class="col-lg-8">
                        <form @submit.prevent="submitOrder">
                            <div class="form-row mb-5 bg-lighter">
                                <div class="col-6 text-dark py-2">
                                    <h5 class="ml-2 font-weight-bold">訂單資訊</h5>
                                </div>
                            </div><!-- form row-->
                            <div class="form-row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="h5 text-dark" for="name">姓名</label>
                                        <input type="text" id="name" name="name"
                                            v-model="data.user.name" 
                                            :class="{'is-invalid': errors.has('name')}" 
                                            v-validate="'required'"
                                            class="form-control form-control-lg"
                                            placeholder="">
                                        <small v-if="errors.has('name')" class="text-danger">請填入姓名</small>
                                    </div><!--姓名-->
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="h5 text-dark" for="phone">電話</label>
                                        <input type="text" id="phone" name="phone"
                                            v-model="data.user.tel" 
                                            :class="{'is-invalid': errors.has('phone')}"
                                            v-validate="'required'"
                                            class="form-control form-control-lg"
                                            placeholder="">
                                        <small v-if="errors.has('phone')" class="text-danger">請填入電話</small>
                                    </div><!--電話-->
                                </div>
                            </div><!-- form row-->
                            <div class="">
                                <label class="h5 text-dark" for="email">電子信箱</label>
                                <div class="form-group">
                                    <input type="email" id="email" name="email"
                                        v-model="data.user.email"
                                        :class="{'is-invalid': errors.has('email')}"
                                        v-validate="'required|email'"
                                        class="form-control form-control-lg" placeholder="">
                                    <small class="text-danger">{{ errors.first('email') }}</small>
                                </div><!--信箱-->
                            </div>
                            <div class="mb-3">
                                <label class="h5 text-dark" for="address">收件地址</label>
                                <div class="form-group">
                                    <input type="text" id="address" name="address"
                                            v-model="data.user.address"
                                            v-validate="'required'"
                                            class="form-control form-control-lg" placeholder="">
                                    <small class="text-danger" v-if="errors.has('address')" >請填入地址</small>
                                </div><!--收件地址-->
                            </div>
                            <div class="">
                                <label class="h5 text-dark" for="memo">備註</label>
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg" 
                                            name="memo" id="memo" placeholder=""
                                            v-model="data.message" >
                                    </textarea>
                                </div><!--備註-->
                            </div>
                        </form>
                    <button class="btn btn-primary btn-block mx-lg-0 py-2" 
                            @click.prevent="submitOrder">
                        送出訂單
                    </button>
                </div><!--collg8-->

                <div class="col-lg-4 d-lg-block">
                    <div class="card">
                        <h5 class="card-header bg-lighter text-center text-dark rounded-0 font-weight-bold">
                            購物清單<span v-if="cart.carts" class="ml-5 text-white badge badge-secondary badge-pill">{{cart.carts.length}}</span></h5>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3"
                                    v-for="item in cart.carts" :key="item.id">    
                                    <div>
                                        <a href="javascript:;" class="btn" @click.prevent="delCart(item.id)">
                                            <i class="fas fa-spinner fa-spin text-primary"
                                                v-if="status.delitem == item.id"></i>
                                            <i class="far fa-trash-alt text-primary" v-else></i>
                                        </a>
                                    </div>
                                    <div>
                                        <div>{{item.product.title}}</div>
                                        <span>{{item.qty}} / {{item.product.unit}}</span>
                                        <div v-if="cart.final_total !== cart.total" class="text-danger">已套用優惠劵</div>
                                    </div>
                                    <div>{{item.total | currency}}</div>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between font-weight-bold">
                                    <span class="h6">總額</span>
                                    <span class="h6">{{cart.total | currency}}</span>
                                </div>
                                <div class="d-flex justify-content-between text-danger font-weight-bold">
                                    <span class="h6 ">折扣後</span>
                                    <span class="h6">{{cart.final_total | currency}}</span>
                                </div>
                            </div><!--cardbody-->
                    </div><!--card-->
                    <div class="input-group mt-3 input-group-md">
                        <input type="text" class="form-control" v-model="coupon.code" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button" @click.prevent="checkcoupon">
                            套用優惠碼
                            </button>
                        </div><!--groupappend-->
                    </div><!--coupon-->
                </div><!--collg4-->
            </div><!--row-->
        </section>
    </div><!--外層row-->
</div><!--外層container-->
</template>




<script>
import $ from 'jquery';
import Alert from '../Alert.vue';


export default {
        components: {
            Alert,
        },
        data () {
            return {
                isLoading: false,
                cart: {
                    carts: [],
                    final_total: 0,
                    total: 0,
                },
                status: {
                    delitem: false,
                },
                data: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: ''
                        },
                        message: ''
                    },
                coupon: {
                    code: ''
                },
            }
    },
    methods: {
         getCart () {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; 
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.cart = response.data.data;
                    vm.isLoading = false;
                }
            });
        },
        delCart (id) {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`; 
            vm.status.delitem = true;
            this.$http.delete(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.getCart();
                    vm.status.delitem = false;
                }
            });
        },
        submitOrder () {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`; 
            // const order = vm.data;
            this.$validator.validate().then((result) => {
            if (result) {
                this.$http.post(api, { data: vm.data }).then((response) => {
                    console.log('訂單已建立', response);
                    if (response.data.success) {
                        vm.$router.push(`/payment/${response.data.orderId}`);
                    } else {
                        vm.$bus.$emit('messsage:push', response.data.message,'danger');
                        }
                    })
                }
            });
        },
        checkcoupon(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`; 
            this.$http.post(api, { 'data': vm.coupon }).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.getCart();
                }else{
                    vm.$bus.$emit('messsage:push', response.data.message);
                }

            });

        },

    },
    created () {
        this.getCart();
        // this.$bus.$emit('messsage:push','訊息', 'success');
        this.$bus.$on('regetCart', () => {
            this.getCart();
            console.log('emit on');
        })

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


</style>