<template>
  <div>
    <ItemSlider />
    <ProductList v-for="product in Object.entries(products)" :product="product" :key="product[0]" />
    <CopyRight />
  </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores'
import ItemSlider from '@/components/ItemSlider.vue'
import ProductList from '@/components/ProductList.vue'
import CopyRight from '@/components/CopyRight.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
import axios from 'axios'

onMounted(async () => {
  const config = import.meta.env
  try {
    if (route.query.code) {
      const response = await axios('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: {
          grant_type: 'authorization_code',
          client_id: config.VITE_REST_API,
          redirect_uri: config.VITE_REDIRECT_GIT,
          code: route.query.code
        }
      })
      if (response) {
        store.changeLogIn(route.path)
        store.userToken = response.data.access_token
        router.push('/')
      } else {
        console.log('Not found data')
      }
    } else {
      console.log('Not found code')
    }
  } catch (error) {
    console.log(error)
  }
})

const store = useItemStore()
const products = store.products
</script>

<style scoped></style>
