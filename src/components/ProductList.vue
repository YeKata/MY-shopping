<template>
    <div>
        <div class="product-wrap" >
        <h1>{{ product[0] }}</h1>
            <div class="product-item" v-if="route.path == '/'">
                <div class="item" v-for="(item,i) in product[1].slice(0,10)" :key="i">
                <ProductItem :product="item"/>
                </div>
            </div>
            <div class="product-item" v-else>
                <div class="item" v-for="(item,i) in product[1]" :key="i">
                <ProductItem :product="item"/>
                </div>
            </div>
        </div>
        <div class="more" :class="{hide: route.path !='/'}"><div class="more-button" @click="moveMore">MORE ></div></div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ProductItem from '@/components/ProductItem.vue'
import { useItemStore } from '@/stores';

    const router = useRouter()
    const route = useRoute()
    const store = useItemStore()
    const props = defineProps({
    product:{type:Object, required: true}
    })
    const key = props.product[0]
    
    const moveMore = () => {
        router.push({
            name:'more',
            params: {key}
        })
        store.setMoreItem(key)
    }    
</script>

<style scoped>

</style>