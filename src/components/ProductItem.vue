<template>
    <div >
        <div @click="toDetail">
            <div class="item-image"
            :style="{backgroundImage: `url(${product.Image})`}"/>
            <div class="item-textbox">
                <div class="item-price ex">{{ product.price.toLocaleString() }}원/{{ (product.price-(product.price*(product.sale/100))).toLocaleString() }}원 {{ parseInt(product.sale) }}%</div>
                <div class="item-name ex"> {{ product.name }}</div>
            </div>
        </div>
        <div class="shopping">
            <div class="bag svg-box" @click="inCart"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores';
import { useRouter } from 'vue-router';
import {onMounted, ref} from 'vue'


    const props = defineProps({
    product:{type:Object, required: true}
    })

    const router = useRouter()
    const price = parseInt(props.product.price)
    const sale = parseInt(props.product.sale)
    const name:string = props.product.name
    const image:string = props.product.Image
    const id:number = props.product.id
    const salePrice = ref()
    const localeSale = ref()
    const store = useItemStore()


const inCart = () => {
    if(store.loginState == true){
        let j = 0
        if(store.cartitems.length == 0){
            const newCartItem = {
                id,
                name,
                price,
                Image:image,
                sale: salePrice.value,
                checked: false,
                ea:1
            }
            store.addCartItem(newCartItem)
        }else{
            for(let i =0; i < store.cartitems.length; i++){
                if(store.cartitems[i].id == id){
                    store.cartitems[i].ea++
                }else{
                    j++
                }
            }
            if(store.cartitems.length == j){
                const newCartItem = {
                id,
                name,
                price,
                Image:image,
                sale: salePrice.value,
                checked: false,
                ea:1
            }
            store.addCartItem(newCartItem)
            }
        }
    }else{
        alert('로그인좀')
    }
}

    const sales = () => {
        salePrice.value = (price-(price*(sale/100)))
        localeSale.value = (price-(price*(sale/100))).toLocaleString()
    }

    onMounted(() => {
        sales()
    })

    const toDetail = () => {
        const item = {
            name: name,
            price: price,
            id:id,
            sale: salePrice.value,
            Image: image
        }
        store.addDetailItem(item)
        router.push({
            name:'detail',
            params: {id: props.product.id}
        })
    }
</script>

<style scoped>

</style>