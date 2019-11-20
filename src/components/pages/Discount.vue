<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 mt-5 mb-5 justify-content-center">
            <h1 class="text-center mt-4 discount-title pb-3 ">
              <span class="icon h2"><i class="fas fa-ticket-alt"></i> </span> 優惠活動
            </h1>
            <div class="coupons">
                <div class="coupon">
                    <div class="coupon-intro">
                        <h6>使用說明：</h6>
                        <ul class="text-fail">
                            <li>優惠代碼如右</li>
                            <li>購買任意商品即享優惠</li>
                            <li>限 2019-11-20-2020-01-31 使用</li>
                        </ul>
                    </div><!--coupon-intro-->
                    <div class="coupon-value">
                    0050
                    </div>
                </div><!--coupon-->
            </div><!--coupons-->
        </div> <!--col8-->
    </div> <!--row-->
</div> <!--container-->
</template>

<script>
export default {
    data () {
        return {

        }
    },

}


</script>

<style lang="scss" scoped>

$background-color: #eee;
$radius-size: 12px;


.discount-title{
  font-size: 1.4rem;
  font-weight: 300;
  border-bottom: 1px dashed #949292;
  .icon{
    font-size: 1.2rem;
    color:#efac37;
   }
}

.coupons {
  background: $background-color;
  padding: 20px;
  width: 550px;
  
  .coupon {
    margin-bottom: 20px;
    display: flex;
    align-items: stretch;
    // justify-content: stretch;
    
    > div {
      padding: 10px 20px;
      border-radius: $radius-size;
    }
    
    .coupon-intro {
      position: relative;
      background: #fff;
      flex: 3;
      
      ul {
        color: #aaa;
        padding-left: 20px;
      }
      
      &:after {
        content: ' ';
        border: 2px dashed $background-color;
        height: 100%;
        position: absolute;
        top: 0;
        right: -2px;
        z-index: 2;
      }
    }
    
    .coupon-value {
      display: flex;
      flex: 1;
      position: relative;
      background: #efac37;
      color: #fff;
      font-size: 38px;
      align-items: center;
      justify-content: center;
      
      &:before {
        content: ' ';
        width: $radius-size * 2;
        height: $radius-size * 2;
        position: absolute;
        top: -$radius-size;
        left: -$radius-size;
        border-radius: 100%;
        background: $background-color;
      }
      &:after {
        content: ' ';
        width: $radius-size * 2;
        height: $radius-size * 2;
        position: absolute;
        bottom: -$radius-size;
        left: -$radius-size;
        border-radius: 100%;
        background: $background-color;
      }
    }
  }
}





</style>