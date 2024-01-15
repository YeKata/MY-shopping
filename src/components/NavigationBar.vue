<template>
  <div class="fix">
    <div class="header-box">
      <div class="home" @click="toHome">Min-TTangu</div>
      <div class="home2" @click="toHome">MT</div>
      <div class="new-best">
        <ol class="best-bar nav">
          <div @click="toNew">New</div>
          <div>Best</div>
        </ol>
      </div>
      <div class="nav-bar">
        <ol class="nav">
          <div v-for="(lis, index) in lists" :key="index" class="nav-div">
            <li @click="moveMorePage(lis)">
              {{ lis.name }}
            </li>
          </div>
        </ol>
      </div>
      <div class="icon-bar-btn" @click="viewIconbox" />
      <div class="icon-bar">
        <ol class="nav">
          <div class="search-box">
            <div class="text-wrap">
              <input type="text" id="searchname" class="text-box" @input="inputComment" />
            </div>
            <div class="search svg-box" @click="searchItem" />
          </div>
          <div class="icon-box">
            <div v-if="store.loginId != 'admin'" class="user header-icon svg-box" @click="toUser" />
            <div v-else class="plus header-icon svg-box" @click="toAdmin"></div>
            <div class="cart header-icon svg-box" @click="toCart" />
            <div
              v-if="store.loginState || store.kloginState"
              class="log header-icon svg-box"
              @click="logOut"
            />
            <div v-else class="header-icon svg-box" @click="toLogin">login</div>
          </div>
        </ol>
      </div>
    </div>
  </div>
  <div class="fix2" :class="{ fix649: !fix2state }">
    <div class="icon-bar2">
      <ol class="nav">
        <div class="search-box">
          <div class="text-wrap">
            <input type="text" id="searchname2" class="text-box" @input="inputComment" />
          </div>
          <div class="search svg-box" @click="searchItem" />
        </div>
        <div class="icon-box">
          <div v-if="store.loginId != 'admin'" class="user header-icon svg-box" @click="toUser" />
          <div v-else class="plus header-icon svg-box" @click="toAdmin"></div>
          <div class="cart header-icon svg-box" @click="toCart" />
          <div
            v-if="store.loginState || store.kloginState"
            class="log header-icon svg-box"
            @click="logOut"
          />
          <div v-else class="header-icon svg-box" @click="toLogin">login</div>
        </div>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import li from '@/assets/list.json'
import { useItemStore } from '@/stores'
import type { list } from '@/types'
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const store = useItemStore()
const lists = reactive(li)
const router = useRouter()
const route = useRoute()
const searchname = ref()
const fix2state = ref(false)

const moveMorePage = (lis: list) => {
  router.push({
    name: 'more',
    params: { key: lis.name }
  })
  store.setMoreItem(lis.name)
}

const toNew = () => {
  router.push('/new')
}

const toHome = () => {
  router.push('/')
}

const toLogin = () => {
  console.log()
  router.push('/login')
}

const logOut = async () => {
  if (store.kloginState == true) {
    await axios('https://kapi.kakao.com/v1/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${store.userToken}`
      }
    })
    store.changeLogOut()
  } else if (store.loginState == true) {
    store.changeLogOut()
  }
  router.replace('/')
}

const inputComment = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.id == 'searchname' || target.id == 'searchname2') {
    searchname.value = target.value
  }
}

const searchItem = () => {
  let i
  let b
  if (store.searchItem != null) {
    store.resetKeyward()
  }
  for (i in store.products) {
    b = store.products[i].length
    for (let a = 0; a < b; a++) {
      if (store.products[i][a].name.includes(searchname.value)) {
        store.addSearchItem(store.products[i][a])
      }
    }
  }
  if (route.path == '/search') {
    store.changeSearchKeyward(searchname.value)
  } else {
    store.changeSearchKeyward(searchname.value)
    router.push('/search')
  }
}

const toUser = () => {
  router.push('/user')
}

const toAdmin = () => {
  router.push('/admin')
}

const toCart = () => {
  if (store.loginState == true) {
    router.push('/cart')
  } else {
    alert('로그인 해주세요')
  }
}

const viewIconbox = () => {
  if (fix2state.value == false) {
    fix2state.value = true
  } else {
    fix2state.value = false
  }
}
</script>

<style scoped></style>
