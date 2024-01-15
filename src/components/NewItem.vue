<template>
    <div>
        <div class="product-wrap search-wrap" >
            <h1>새로 등록된 상품!</h1>
            <div class="product-item">
                <div class="item" v-for="(item,i) in store.newItem" :key="i">
                    <ProductItem :product="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores';
import ProductItem from './ProductItem.vue';

const store = useItemStore()

</script>

<style scoped>

</style>