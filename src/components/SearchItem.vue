<template>
    <div>
        <div class="product-wrap search-wrap" >
            <h1>'{{ store.searchKeyward }}'에 대한 검색 결과입니다.</h1>
            <div class="product-item">
                <div class="item" v-for="(item,i) in store.searchItem" :key="i">
                    <ProductItem :product="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores';
import { onMounted } from 'vue';
import ProductItem from './ProductItem.vue';



const store = useItemStore()

onMounted(() => {
    console.log(store.searchKeyward);
})
</script>

<style scoped>
    .search-wrap{
        margin: auto;
    }
</style>