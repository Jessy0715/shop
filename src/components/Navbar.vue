<template>
<div class="fixed-top">

 <!-- nav -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/"></router-link>
        <a href="/"><img src="../assets/images/logo.svg" width="55"alt=""/></a>
    <button 
        class="navbar-toggler" type="button" 
        data-toggle="collapse" data-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/">
                    首頁
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/discount">
                    優惠活動
                </router-link>
            </li>    
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">
                    後台管理
                </router-link>
            </li> 
            <li>
                <div class="dropdown ml-auto">
                    <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                        <i class="fa fa-shopping-cart fa-2x text-primary" aria-hidden="true"></i>
                        <span class="badge badge-pill badge-danger">{{cart.carts.length}}</span>
                        <!--<span class="badge badge-pill badge-danger">{{cartstotal}}</span>-->
                        <span class="sr-only">unread messages</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" 
                         style="min-width: 300px"
                         v-if="cart.carts.length">
                        <div class="px-4 py-3">
                            <h6>已選擇商品</h6>
                            <table class="table table-sm" v-if="cart.carts.length">
                                <tbody>
                                    <tr v-for="item in cart.carts" :key="item.id">
                                        <td width="50" class="align-middle ">
                                            <a href="javascript:;" @click.prevent="delCart(item.id)">
                                                <i class="fas fa-spinner fa-spin"
                                                    v-if="status.delitem"></i>
                                                <i class="fa fa-trash-alt" v-else></i>
                                            </a>
                                        </td>
                                        <td width="200" class="align-middle">{{item.product.title}}</td>
                                        <td width="80"class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                                        <td class="align-middle text-right">{{item.total | currency}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">小計</td>
                                        <td class="align-middle text-right">{{cart.total | currency}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <router-link to="/checkout" class="btn btn-primary btn-block">
                                <i aria-hidden="true"></i> 結帳去
                            </router-link>
                        </div><!-- px-4-->
                    </div><!-- dropdown menu-->
                    <div class="dropdown-menu dropdown-menu-right"
                         style="min-width: 300px"
                         v-else>
                         <span class="pl-3">目前購物車空無一物</span>
                    </div>
                </div><!-- dropdown-->
            </li>
        </ul>

    </div>
</nav>

</div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
    data () {
        return {
            // cart: {
            //     carts: [],  
            // },
            status: {
                delitem: false,
            },
  
        }
     
    },
    methods: {
        ...mapActions('cartsModules', ['getCart']),
        ...mapActions('cartsModules', ['delCart']),
    },
    computed: {
        ...mapGetters('cartsModules', ['cart', 'cartstotal'])
    },
    created () {
        this.getCart();
        this.$bus.$on('regetCart', () => {
            this.getCart();
            console.log('emit on');
        })


    },

}
</script>

<style lang="scss">

    .btn-cart {
        background-color:transparent;
        position: relative;

        .btn-cart .badge {
            position: absolute;
            top: -20px;
            right:10px;
        }
    }

    .dropdown-menu-right {
        right: 0;
        left: auto;
    }


</style>