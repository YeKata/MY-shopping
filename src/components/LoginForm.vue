<template>
  <div class="login wrap">
    <div class="login-title"><h2>Login & Join</h2></div>
    <div class="login-form">
      <div class="login-box">
        <div class="login-text">회원로그인</div>
        <div class="sizing">
          <input
            type="text"
            :value="id"
            id="id"
            class="input-box"
            placeholder="아이디"
            @input="inputcomment"
          />
        </div>
        <div class="sizing">
          <input
            type="password"
            :value="pass"
            id="pass"
            class="input-box"
            placeholder="비밀번호"
            @input="inputcomment"
          />
        </div>
        <div class="login-button sizing" @click="tologin">로그인</div>
        <div class="login-button sizing" @click="toJoin">회원가입</div>
        <div class="sizing login-button kakao" @click="loginWithKakao" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const id = ref()
const pass = ref()
const config = import.meta.env
const route = useRoute()
const router = useRouter()
const store = useItemStore()
const memberlist = store.member

const inputcomment = (e: Event) => {
  if ((e.target as HTMLInputElement).id == 'id') {
    id.value = (e.target as HTMLInputElement).value
  } else if ((e.target as HTMLInputElement).id == 'pass') {
    pass.value = (e.target as HTMLInputElement).value
  }
}

const tologin = async () => {
  const log = {
    id: id.value,
    pass: pass.value
  }

  for (let i = 0; i < memberlist.length; i++) {
    if (memberlist[i].id == log.id && memberlist[i].pass == log.pass) {
      store.changeLogIn(route.path)
      store.setloginId(log.id)
      console.log(store.loginId)
      await router.replace('/')
    }
  }
}

const loginWithKakao = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${config.VITE_REST_API}&redirect_uri=${config.VITE_REDIRECT_GIT}`
}

const toJoin = () => {
  router.push('/join')
}
</script>

<style scoped></style>
