<template>
    <div class="join wrap">
        <div class="join-form">
            <div class="login-box">
                <div class="login-text">
                    신규 물품 등록
                </div>
                <div class="sizing">
                    <input type="text" :value="name" id="name" class="input-box" placeholder="상품명" @input="inputComment"/>
                </div>
                <div class="sizing-flex">
                    <div class="harf-sizing">
                        <input type="text" :value="price" id="price" class="harf-input-box" placeholder="가격"  @input="inputComment" />
                    </div>
                    <div>
                    - 
                    </div>
                    <div class="harf-sizing">
                        <input type="text" :value="sale" id="sale" class="harf-input-box" placeholder="세일" @input="inputComment" maxlength="3"/>
                    </div>
                </div>
                <div class="sizing">
                    <input type="text" :value="id" id="id" class="input-box" placeholder="아이디" @input="inputComment" />
                </div>
                <div class="sizing">
                   <input id="file" multiple type="file" class="inputfile" @change="upload"/>
                    <label class="image-label" for="file">+</label>
                </div>
                <div class="login-button sizing" @click="add">
                    등록
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useItemStore } from '@/stores';
import { ref} from 'vue';

const name = ref('')
const price = ref()
const sale = ref()
const id = ref()
const Image = ref()
const store = useItemStore()


const inputComment = (e: Event) => {
    const target = (e.target)as HTMLInputElement
 
    if(target.id == "name"){
       name.value = target.value;
    }
    else if(target.id == "id"){
       id.value = target.value;
    }
    else if(target.id == "price"){
       price.value = target.value;
    }
    else if(target.id === "sale"){
       sale.value = target.value;
    }
    else if(target.id == "Image"){
       Image.value = target.value;
    }  
}

const add = () => {
    const Item = {
        name:name.value,
        price:price.value,
        sale:sale.value,
        id:id.value,
        Image:Image.value
    }
    if(Item.name == ''){
        alert('상품명 입력')
    }else if(Item.price == undefined){
        alert('가격 입력')
    }else if (Item.sale == undefined){
        alert('세일 입력')
    }else if(Item.id == undefined){
        alert('id 입력')
    }else if(Item.Image == undefined){
        alert('이미지 등록')
    }else{
    console.log(Item);
    store.addNewProduct(Item)
    router.push('/new')
    }

}

const upload = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let file = target.files;
      if (!file) return;
      let url = URL.createObjectURL(file[0]);
      Image.value = url;
    };
</script>

<style scoped>

</style>