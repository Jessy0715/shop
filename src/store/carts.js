import axios from 'axios';

export default {
    namespaced: true,
    state: {
      cart: {
        carts: []
      },
      cartsTotal: 0
    },
    actions:{
        getCart (context) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; 
            axios.get(api).then((response) => {
                // console.log(response.data);
                context.commit('CART', response.data.data)
                context.commit('CARTTOTAL', response.data.data.carts.length)

            });
        },
        delCart (context,id) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`; 
            // vm.status.delitem = true;
            axios.delete(api).then((response) => {
                context.dispatch('getCart');
                // console.log(response.data);
            });
        },
        addToCart(context,{id, qty}){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; 
            const cart = {
                product_id: id,
                qty
            }
            // vm.status.getProductId = true;
            axios.post(api, { data: cart }).then((response) => {
                // console.log(response.data);
                context.dispatch('getCart')
            });
        },


    },
    mutations:{
        CART (state, payload) {
            state.cart = payload
        },
        CARTTOTAL (state, payload) {
            state.cartsTotal = payload
        },
    },
    getters:{
        cart (state) {
            return state.cart
        },
        cartstotal (state) {
            return state.cartsTotal
        }

    },

}