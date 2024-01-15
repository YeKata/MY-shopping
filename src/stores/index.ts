import { ref,reactive } from 'vue'
import { defineStore } from 'pinia'
import item from '@/assets/item.json'

import memberlist from '@/assets/member.json'
import type { cart, member, product } from '@/types'


export const useItemStore = defineStore('Items', () => {

  const products:any = reactive(item)
  const cartitems:cart[] = reactive([])
  const member = reactive(memberlist)
  const loginState = ref(false)
  const kloginState = ref(false)
  const loginId = ref()
  const detailItem = ref()
  const userToken = ref()
  const searchKeyward = ref()
  const searchItem:any = reactive([])
  const moreItem:any = []
  const newItem:product[] = reactive([])

  const addNewProduct = (Item:product) => {
    newItem.push(Item)
  }

  const addCartItem = (cartitem:cart) => {
    cartitems.push(cartitem)
  }

  const addMember = (members:member) => {
    member.push(members)
    console.log(memberlist);
  }

  const addSearchItem = (Item:product) => {
    searchItem.push(Item)
  }

  const addDetailItem = (Item:product) => {
    detailItem.value = Item
  }
  
  const changeLogIn = (path:string) => {
    if(path =='myshopping/klogin'){
      kloginState.value = true
    } 
    else{
      loginState.value = true 
    }
  }

  const changeLogOut = () => {
      kloginState.value = false
      loginState.value = false
      loginId.value = ''
  }

  const setloginId = (id:string) => {
    loginId.value = id
  }

  const resetKeyward = () => {
    searchKeyward.value = ''
    searchItem.splice(0)
  }

  const changeSearchKeyward = (keyward:string) => {
    searchKeyward.value = keyward
  }

  const setMoreItem = (key:string) => {
    moreItem.values = [key,products[key]]
  }

  return{ products, cartitems, member, loginState, kloginState, detailItem, userToken, searchKeyward, searchItem, moreItem, newItem, setloginId, addNewProduct, addCartItem, addMember, addSearchItem, addDetailItem, resetKeyward, changeLogIn,changeLogOut, changeSearchKeyward, setMoreItem, loginId}
})