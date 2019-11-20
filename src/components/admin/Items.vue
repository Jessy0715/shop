<template>
  <div>
    <loading :active.sync="isLoading"></loading>


    <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>

    <table class="table mt-4">
        <thead>
            <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="80">編輯</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
                {{ item.origin_price | currency }}
            </td>
            <td class="text-right">
                {{ item.price | currency }}
            </td>
            <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
            </td>
            <td class="d-flex">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                <button class="btn btn-outline-danger btn-sm" @click="delModal(item)">刪除</button>
            </td>
            </tr>
        </tbody>
    </table>
<!--
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre }">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="getProducts(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next }">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="getProducts(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
-->
    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
    
    <!-- Modal:edit -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files" @change="uploadFile">
                    </div>
                    <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題"  v-model="tempProduct.title">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                    </div>
                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="is_enabled" :true-value="1" :false-value="0" 
                        v-model="tempProduct.is_enabled">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    
   <!-- Modal:delet -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import $ from 'jquery'; //vue裡面不認得 $，因此要匯入
import Pagination from '../Pagination';

export default {
 data (){
        return{
            products:[],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
            status: {
              fileUploading: false,
            },
        };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`; 
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;  
      this.$http.get(api).then((response) => {
        console.log(response.data);
          vm.isLoading = false;
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show'); 
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; 
      let httpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {    
        console.log(response.data);
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗');
        }
        // vm.products = response.data.products;
      });
    },
    delModal(item){
      const vm = this;
      $('#delProductModal').modal('show');
      vm.tempProduct = Object.assign({}, item);
    },
    delProduct(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(url).then((response)=>{
        console.log(response, vm.tempProduct);
        $('#delProductModal').modal('hide');
        vm.isLoading = false;
        this.getProducts(); //刪除了資料庫資料所以要重新抓取資料刷新
      });

      // let vm = this;
      // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      // this.$http.delete(api).then((response) => {
      //   console.log(response.data);
      //   if(response.data.success){
      //     $("#delProductModal").modal("hide");
      //     vm.getProducts(); //刪除了資料庫資料所以要重新抓取資料刷新
      //     console.log('成功刪除');
      //   }else{
      //     $("#delProductModal").modal("hide");
      //     vm.getProducts();
      //     console.log('刪除失敗');
      //   }
      // });
    },
    uploadFile() {
      console.log(this); //Vuecomponents裡的內容
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        vm.status.fileUploading = false;
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);  //如果成功，網址就會上傳到 url裡
        }else{
          this.$bus.$emit('message:push', response.data.message, 'danger');  //不成功就會跳出錯誤訊息
        }
      });
    },
  },
  created() {  //在 methods 之外
    this.getProducts(); //觸發 getProducts 事件
  },
};

// updateProduct 講解:
// tempProduct 就是要送出的欄位內容
// 1. get 改成 post; 加入 vm.tempProduct，不過因為是物件，所以加上 {}
// 2.判斷式:新增產品成功就可以關閉 modal，重新取得一次遠端的資料，否則的話新增失敗的錯誤訊息
// 3.用同一個模板做兩件事情:新增 isNew: false;  openModal帶入參數; 判斷式: 如果新增的話，會有空的物件，如果不是的話，就會把原本 item 帶進去
// 4.因為物件傳參考特性，this.tempProduct = item，所以用 assig方法，可以將 item 寫到空物件，避免有傳參考特性
// 5.寫 isNew 判斷式，如果是選擇 編輯的話(false)，帶上 id，且要用 put 方法
// 6.建立新的產品與編輯按鈕 都加入參數

// uploadFile 圖片上傳講解
// 1.@change="uploadFile" 當欄位有變更，觸發 uploadFile
// 2.$refs.files.files 找到路徑，上傳他是屬於陣列
// 3.formData 物件，模擬傳統表單送出的形式
// 4.定義路徑 url，將表單形式改成 form-data
// 5. 圖片帶進去，可是沒有出現網址，表示沒有雙向綁定，因此要寫 $set

// loading講解:
// 1. isLoading 為 false 是未啟用，為 true 是啟用
// 2.vm.isLoading = true/ false; 在 getProducts 前後
// 3.建立 fileUpload ，並綁訂在 icon 上
// 4.vm.status.fileUploading = true/false;在 uploadFile 前後

//pagination講解:
// 1.在 data 新增 pagination 物件
// 2.在 getProducts 新增  vm.pagination = response.data.pagination; 存進 變數裡
// 3.新增 pagination 程式碼
// 4.寫 v-for & :key & :class active 顯現當前頁碼 
// 5. disabled 判別式 has_next、has_pre
// 6. page = 1 & products?page=${page} 預設值帶第一頁進來，如果沒有帶數值，就會從後來傳來的數值去替代
      // @click.prevent="getProducts(page)" 正確換頁
// 7.pagination.current_page - 1 or + 1

// filter 講解
// 1. 新增 currency.js
// 2. 在 main.js 匯入
// 3. 加入 |filter 符號
</script>

