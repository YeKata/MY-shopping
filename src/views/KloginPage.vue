<template>
  <div />
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useItemStore()
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
          redirect_uri: config.VITE_REDIRECT_URI,
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
</script>

<style scoped></style>
