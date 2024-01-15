<template>
    <div>
       <ProductList :product="store.moreItem.values"/>
    </div>
</template>

<script setup lang="ts">
import ProductList from '@/components/ProductList.vue';
import { useItemStore } from '@/stores';

const store = useItemStore()

</script>

<style scoped>

</style>