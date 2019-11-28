<template>
<div>
<loading :active.sync="isLoading" ></loading>
    <section class="mt-5">
		<div class="container">
			<div class="row justify-content-around">
				<div class="col-lg-6 mb-5">
					<div><a href="javascript:;" class="arrow left" @click.prevent="back"></a></div>
                    <img :src="product.imageUrl" class="img-fluid w-100 shadow" alt="">
				</div><!--collg6-->
				<div class="col-lg-6 pl-md-5">
                    <small class="badge badge-primary text-white">{{product.category}}</small>
					<h3 class="mt-2 text-dark">{{product.title}}</h3>
                    <div class="d-inline-flex flex-row mb-3">
                        <p class="h3 text-info"><span>{{product.price  | currency}}</span></p>
                        <del class="h5 text-fail ml-4">{{product.origin_price  | currency}}</del>
                    </div><!--price-->
					<h6 class="mt-3 text-dark">[產品說明]</h6>
					<p class="text-dark">{{product.description}}</p>
					<div class="row mt-4">
						<div class="col-md-6">
							<div class="form-group d-flex"></div>
						</div><!--colmd6-->
						<div class="w-100"></div>
                        <Numcount @buyAmount="buyAmount"></Numcount>
					</div><!--row-->
					<p>
                        <a href="#" class="btn btn-dark mt-3 py-2 px-4 rounded-pill"
                        @click.prevent="addToCart(product.id,qty)">
                        <i v-if="status.getProductId" class="fas fa-spinner fa-spin"></i>
                        加入購物車</a>
                    </p>
				</div><!--collg6-->
			</div><!--row-->
		</div><!--container-->
	</section>

</div>
</template>


<script>
import $ from 'jquery';
import Numcount from './Numcount.vue'

export default {
    data () {
        return {
            product: {},
            pdId: '',
            isLoading: false,
            buyNum:1,
            qty: 1,
            status: {
                getProductId: false,
            },

        }


    },
    components: {
        Numcount,
    },
    methods: {
        getProdust(Id){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${Id}`; 
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    vm.product = Object.assign({}, response.data.product)
                    console.log(vm.product);
                    vm.isLoading = false;
                }
            });
        },
        // addToCart (id, qty ) {
        //     const vm = this;
        //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; 
            // const cart = {
            //     'product_id': id,
            //     'qty': vm.buyNum,
            // }
        //     vm.status.getProductId = true;
        //     this.$http.post(api, { 'data': cart }).then((response) => {
        //         console.log(response.data);
        //         if (response.data.success) {
        //             vm.status.getProductId = false;
        //         }

        //     });
        //     this.$bus.$emit('regetCart');
        // },
        addToCart (id, qty) {
            this.$store.dispatch('cartsModules/addToCart', { id, qty })
        },
        buyAmount(num){
            this.qty = num;
        },
        back(){
            this.$router.back();
        },
    },
    created () {
        this.pdId = this.$route.params.product_id;
        this.getProdust(this.pdId);
    },

}

</script>
<style lang="scss" scoped>

.arrow {
	position: absolute;
	top: 50%;
	width: 5vmin;
	height: 5vmin;
	background: transparent;
	border-top: 2px solid #2157A9;
	border-right: 2px solid #2157A9;
	box-shadow: 0 0 0 lightgray;
	transition: all 200ms ease;
	
	&.left {
		left: 0;
		transform: translate3d(0,-50%,0) rotate(-135deg);
	}
	
	&:hover {
		border-color: #3778da;
		box-shadow: 0.5vmin -0.5vmin 0 white;
	}
}

.shadow{
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}




</style>