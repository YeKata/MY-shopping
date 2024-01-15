<template>
    <div class="join wrap">
        <div class="join-form">
            <div class="login-box">
                <div class="login-text">
                    회원가입
                </div>
                <div class="sizing">
                    <input type="text" class="input-box" id="sample4_postcode" :value="post" @click="sample4_execDaumPostcode()" placeholder="우편번호" readonly/>
                 </div>
                <div class="sizing">
                    <input type="text" class="input-box" id="sample4_roadAddress" :value="road" placeholder="도로명주소" readonly/>
                </div>
                <div class="sizing">
                    <input type="text" class="input-box" id="detail" :value="detail" @input="inputComment" placeholder="상세주소"/>
                </div>
                <div class="sizing">
                    <input type="text" :value="name" id="name" class="input-box" placeholder="이름" @input="inputComment"/>
                </div>
                <div class="sizing-flex">
                    <div class="harf-sizing">
                        <input type="text" pattern="/^[0-9]*$/" :value="jumin" id="jumin" class="harf-input-box" placeholder="주민등록번호"  @input="inputComment" maxlength="6"/>
                    </div>
                    - 
                    <div class="harf-sizing">
                        <input type="password" pattern="/^[0-9]*$/" :value="juminback" id="juminback" class="harf-input-box" placeholder="뒷자리" @input="inputComment" maxlength="7"/>
                    </div>
                </div>
                <div class="sizing">
                    <input type="text" pattern="\d*" :value="phone" id="phone" class="input-box" placeholder="폰번호(-없이 입력해주세요)" @input="inputComment" title="입력한 내용을 확인해주세요" minlength="10" maxlength="11" required/>
                </div>
                <div class="sizing">
                    <input type="text" :value="id" id="id" class="input-box" placeholder="아이디" @input="inputComment" />
                </div>
                <div class="sizing">
                   <input type="password" :value="pass" id="pass" class="input-box" placeholder="비밀번호" @input="inputComment" />
                </div>
                <div class="sizing">
                    <div :class="[state === true ? 'v':'x']"/>
                    <input type="password" :value="repass" id="repass" class="input-box" placeholder="비밀번호확인" @input="inputComment"/>
                </div>
                <div class="login-button sizing" @click="join">
                    회원가입
                </div>
            </div>
        </div>
    </div>
</template>
 
<script setup lang="ts">
import { useItemStore } from '@/stores';
import { useRouter } from 'vue-router';
import {ref} from 'vue'

declare global {
  interface Window {
    daum?: any;
}
}

const router = useRouter()
 
const name = ref()
const jumin = ref()
const juminback = ref()
const phone = ref()
const id = ref()
const pass = ref()
const repass = ref()
const post = ref()
const road = ref()
const detail = ref()
const store = useItemStore()
const state = ref(false)
 
const sample4_execDaumPostcode = () => {
    new window.daum.Postcode({
        oncomplete: function(data:any) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 참고 항목 변수
 
 
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
               extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
 
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            post.value = data.zonecode;
            road.value = roadAddr;
                 
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
               road.value += extraRoadAddr;
            } else {
               road.value;
            }
        }
    }).open();
}
 
const inputComment = (e: Event) => {
    const target = (e.target)as HTMLInputElement
 
    if(target.id == "name"){
       name.value = target.value;
    }
    else if(target.id == "jumin"){
       let jcheck = /^[0-9]{6}/
       if(target.value.length == 6){
            if(jcheck.test(target.value)){
               jumin.value = target.value;
            }else{
                alert('숫자만 입력해 주세요')
                target.value = ''
            }
        }
    }
    else if(target.id == "juminback"){
       let jbcheck = /^[0-9]{7}/
       if(target.value.length == 7){
            if(jbcheck.test(target.value)){
              juminback.value = target.value;
            }else{
               alert('숫자만 입력해 주세요')
               target.value = ''
            }
        }
    }
    else if(target.id == "phone"){
        let pcheck = /^(011|010)[0-9]{7,8}/
        if(target.value.length >=10 ){
            if(pcheck.test(target.value)){
               phone.value = target.value;
            }else{
               alert('전화번호를 확인해주세요')
               target.value = ''
            }
        }
         
    }
    else if(target.id == "id"){
       id.value = target.value;
    }
    else if(target.id == "pass"){
       pass.value = target.value;
    }
    else if(target.id === "repass"){
       repass.value = target.value;
        if(pass.value == repass.value){
           state.value = true
        }else{
           state.value = false
        }
    }
    else if(target.id == "detail"){
       detail.value = target.value;
    }  
    }
       
 
const join = () => {
    const a = ref(0)
  
    const member:any = {
        name: name.value,
        jumin: jumin.value,
        juminback: juminback.value,
        phone: phone.value,
        id: id.value,
        pass: pass.value,
        post: post.value,
        road: road.value,
        detail: detail.value
    }
 
    for(const i in member){
        if(member[i] == null || member[i] == undefined){
            alert(i+'값이 비어있습니다 확인해주세요')
            break;
        }else{
            a.value++
        }
    }
    if(a.value ==9){
        if(member.pass === repass.value){
        store.addMember(member)
        alert('회원가입이 완료되었습니다')
        router.push('/login')
        }else{
        alert('비밀번호가 서로 다릅니다')
        }
    }
   
    
}
</script>
 
<style scoped>
 
</style>