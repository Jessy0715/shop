<template>
    <div class="input-group col-md-6 d-flex mb-3">
        <span class="input-group-prepend mr-2">
            <button type="button" 
                    class="quantity-left-minus btn"
                    @click="minus">        
                <i class="fa fa-minus"></i>
            </button>
        </span>
        <input type="text" class="text-center form-control" v-model="qty">
        <span class="input-group-append ml-2">
            <button type="button" class="quantity-right-plus btn"
                    @click="plus">
                <i class="fa fa-plus"></i>
            </button>
        </span>
    </div><!--colmd6-->
</template>

<script>
export default {
    data () {
        return {
            // count: 1
            qty: 1,
        }
    },
    methods:{
        // minus () {
        //     this.count > 1 ? this.count -= 1 : this.count = 1;
        //     this.emitNum();
        // },
        // plus () {
        //     this.count += 1;
        //     this.emitNum();
        // },
        // emitNum(){
        //     this.$emit('buyAmount', this.count)
        // },
        minus () {
            this.qty > 1 ? this.qty -= 1 : this.qty = 1;
            this.emitNum();
        },
        plus () {
            this.qty += 1;
            this.emitNum();
        },
        emitNum(){
            this.$emit('buyAmount', this.qty)
        },

    },

}
</script>
<style>
.input-group > .input-group-prepend > .btn, 
.input-group > .input-group-append > .btn {

    border:1px solid #c5c5c5;
}


</style>