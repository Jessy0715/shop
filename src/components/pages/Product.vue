<template>
    <div class="row">
        <div class="col-md-4 mb-4 mt-sm-3 mt-md-0" v-for="item in products" :key="item.id">
            <div class="card h-100 border-0 rounded-0 bg-lighter">
                <a href="javascript:;"
                   style="height: 300px; background-size: cover; background-position: center" 
                   :style="{backgroundImage : `url(${item.imageUrl})`}"
                   @click.prevent="singleProduct(item.id)">
                </a>
                <div class="card-body">
                    <span class="badge badge-primary text-white mb-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="javascript:;" class="text-dark"
                           @click.prevent="singleProduct(item.id)">
                        {{item.title}}
                        </a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between mt-2">
                        <div class="d-flex flex-column">
                            <div class="h5" v-if="!item.price">{{ item.origin_price | currency }} </div>
                            <del class="h6 text-fail" v-if="item.price">{{item.origin_price | currency}} </del>
                            <div class="h5 text-info" v-if="item.price">{{item.price | currency }}</div>
                        </div><!-- price-->
                        <div class="d-flex flex-column justify-content-center">
                            <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="addToCart(item.id,qty)" :id="item.id"
                                    @mouseover="alertAddcart(item.id)"
                                    data-toggle="tooltip" data-placement="top" 
                                    title="已入購物車">
                                加入購物車
                                <i v-if="status.getProductId" class="fas fa-spinner fa-spin"></i>
                            </button>
                        </div><!-- cart-->
                    
                    </div><!-- price & cart-->
                </div><!-- cardbody-->
            </div><!-- card-->
        

        </div><!-- col4-->
    </div><!-- row-->







</template>


<script>
import $ from 'jquery';

export default {
    props: ['products'],
    data(){
        return {
            qty: 1,
            status: {
                getProductId: false,
            }

        }

    },
    methods:{
                   
    singleProduct(id){
        this.$router.push(`/products/${id}`);
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cartsModules/addToCart', { id, qty })
    },
    alertAddcart (id) {
        $(`#${id}`).tooltip({
            trigger: 'click'
        });
        setTimeout(function () {
            $(`#${id}`).tooltip('hide')
        }, 1800);

    },

    }
}

</script>
<style lang="scss" scoped>

.card{
    box-shadow:0 0.125rem 0.85rem rgba(0,0,0,.095);
    &:hover{
        box-shadow: 0 8px 24px #b9b9b9;
        cursor:pointer;
    }

}

</style>