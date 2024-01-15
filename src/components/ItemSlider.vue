<template>
    <div>
        <swiper
        :loop="true"
        :speed="500"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :modules="[Autoplay]"
      >
        <swiper-slide v-for="slide in ListItem" :key="slide.Id"  :style="{background: `url(${slide.Image})  no-repeat center center/cover`}"/>
      </swiper>
    </div>
</template>

<script setup lang="ts">
import Items from "@/assets/ListItem.json"
import { reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const ListItem = reactive(Items)
</script>

<style scoped>

</style>