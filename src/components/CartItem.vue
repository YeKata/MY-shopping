<template>
    <div>
        <div class="cart-title"><h1>장바구니</h1></div>
        <div class="cart-flex cart-select">
            <div class="select-flex"><div :class="[store.cartitems.length == checkedCart ? 'abg': 'acg']" @click="allCheck"/><div>전체 선택 [{{ checkedCart }}/{{ items.length }}]</div></div>
            <div class="select-flex "><div class="select-delete" @click="checkDelete">선택 삭제</div></div>
        </div>
        <div class="cart-flex cart-body" v-for="(item,i) in store.cartitems" :key="i" >
            <div :class="[item.checked === true ? 'cb':'cg']" @click="checkItem(i)"/>
            <div class="item-bg" :style="{backgroundImage: `url(${item.Image})`}" />
            <div>
                {{ item.name }}
            </div>
                <div class="ea-flex">
                    <div class="ea cursor " @click="eaMinus(i)">-</div><div class="ea ea-number">{{ item.ea }}</div><div class="ea cursor " @click="eaPlus(i)">+</div>
                </div>
            <div class="price-flex">
                <div class="md-line">{{ item.price.toLocaleString() }}</div>  
                <div>{{ item.sale.toLocaleString() }}</div>
            </div>
            <div class="xb cursor" @click="deleteitem(i)"/>
        </div>
        <div class="total-flex">
            <div class="total-buy">
                총 가격
            </div>
            <div class="total-buy">
                {{ sum }} 원 
            </div>
            <div class="buy-btn btn-box cursor total-buy" @click="toBuy()">
                 구매하기
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores';
import {ref, reactive} from 'vue'


const store = useItemStore()
const items = store.cartitems
const prices:number[] = reactive([])
const sum = ref()
const checkedCart = ref(0)

const checkItem = (i:number) => {
    if(store.cartitems[i].checked==false){
        store.cartitems[i].checked=true
        setPrice(i)
        checkedCart.value++
    }else{
        store.cartitems[i].checked=false
        prices[i]=0
        totalprice()
        checkedCart.value--
    }
}

const eaMinus = (i:number) => {
    store.cartitems[i].ea--
    if(store.cartitems[i].checked == true){
        setPrice(i)
    }   
}

const setPrice = (i:number) => {
    prices[i] = store.cartitems[i].ea*store.cartitems[i].sale
    totalprice()
}

const eaPlus = (i:number) => {
    items[i].ea++
    if(items[i].checked == true){
        setPrice(i)
    }   
}
const deleteitem = (i:number) => {
    items.splice(i,1)
    totalprice()
}

const totalprice = () => {
    sum.value = prices.reduce((a,b) =>(a+b)).toLocaleString()
}

const allCheck = () => {
    if(checkedCart.value < items.length){
        for(let i =0; i <items.length; i++){
        if(items[i].checked == false){
            items[i].checked = true
            setPrice(i)
            checkedCart.value++
            }  
        }
    }else if(checkedCart.value == items.length){
        for(let i =0; i <items.length; i++){
            items[i].checked = false
            prices[i]=0
            totalprice()
            checkedCart.value--
        }
    }
    
}

const checkDelete = () => {
    for(let i = items.length-1; i >= 0; i--) {
        if(items[i].checked == true){
            prices[i]=0
            deleteitem(i)
            checkedCart.value--
        }
    }
    totalprice()
}

const toBuy = () => {
    alert('정식 런칭 앱이 아니라서 구매기능은 구현되어있지 않습니다.')
}
</script>

<style scoped>

</style>