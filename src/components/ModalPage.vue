<template>
    <div class="modal-black">
      <div class="modal-white">
        <div class="modal-text">
          현재 사용자 페이지는 아직 구현하지 않은 상태입니다 죄송합니다.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped>
    .modal-black {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .modal-white {
      background: white;
      border-radius: 8px;
      width: 35vw;
      text-align: center;
      margin: auto;
    }
  .modal-text{
      text-shadow: 0 0 2px #00f;
      font-size: 1.5rem;
  }
  </style>
  