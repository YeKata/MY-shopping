<template>
    <div>
        <div class="dp">
           <div class="detail-image" :style="{backgroundImage: `url(${item.Image})`}"/>
           <div class="detail-text">
                <div class="detail-name">{{ item.name }}</div>
                <div class="price-group">
                    <div class="price">
                        <div class="detail-price md-line">{{ localePrice }}원/</div>
                        <div class="detail-saleprice">{{ localeSale }}원</div>
                    </div>
                    <div class="detail-price">총 {{ saleprice }}원 할인</div> 
                </div>
                <div class="detail-ea">
                    <div class="ea-text">수량</div>
                    <div class="ea-flex">
                        <div class="ea cursor " @click="eaMinus()">-</div><div class="ea ea-number">{{ ea }}</div><div class="ea cursor " @click="eaPlus()">+</div>
                    </div>
                </div>
                <div class="detail-total">
                    <div>총금액</div> 
                    <div>{{ eaPrice }} 원</div>
                </div>
                <div class="detail-btn">
                    <div class="cart-btn btn-box cursor" @click="inCart">장바구니</div>
                    <div class="buy-btn btn-box cursor" @click="toBuy">구매하기</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores';
import {ref} from 'vue'


const store = useItemStore()
const item = store.detailItem
const localePrice = item.price.toLocaleString()
const localeSale = item.sale.toLocaleString()
const saleprice = (item.price - item.sale).toLocaleString()
const ea = ref(0)
const eaPrice = ref()

const eaMinus = () => {
    if(ea.value > 0) {
        ea.value--
        eatotalPrice()
    } else{
        alert('최저 갯수입니다.')
    }
}

const eaPlus = () => {
    ea.value++
    eatotalPrice()
}

const eatotalPrice = () => {
   eaPrice.value =  (ea.value * item.sale).toLocaleString()
}

const inCart = () => {
    if(store.loginState == true) {
        let j = 0
        if(store.cartitems.length == 0){
            const newCartItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                Image: item.Image,
                sale: item.sale,
                checked: false,
                ea:1
            }
            store.addCartItem(newCartItem)
        }else{
            for(let i =0; i < store.cartitems.length; i++){
                if(store.cartitems[i].id == item.id){
                    store.cartitems[i].ea++
                    console.log('동작 했슴요');
                }else{
                    j++
                    console.log('다른템임');
                }
            }
            if(store.cartitems.length == j){
                const newCartItem = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    Image: item.Image,
                    sale: item.sale,
                    checked: false,
                    ea:1
                }
                store.addCartItem(newCartItem)
            }
        }
    }
}

const toBuy = () => {
    alert('정식 런칭 앱이 아니라서 구매기능은 구현되어있지 않습니다.')
}
</script>

<style scoped>


</style>