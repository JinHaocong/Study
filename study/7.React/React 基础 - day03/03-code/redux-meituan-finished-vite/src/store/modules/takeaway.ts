// 编写store

import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {FoodState} from "../interface";
import {AppDispatch} from "../index.ts";

const initialState: FoodState = {
    // 商品列表
    foodsList: [],
    // 菜单激活下标值
    activeIndex: 0,
    // 购物车列表
    cartList: []
}

const foodsStore = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        // 更改商品列表
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        // 更改activeIndex
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            // 是否添加过？以action.payload.id去cartList中匹配 匹配到了 添加过
            const cartItem = state.cartList.find(item => item.id === action.payload.id)
            if (cartItem) {
                cartItem.count++
            } else {
                state.cartList.push({
                    ...action.payload,
                    count: 1
                })
            }

            const foodItem = state.foodsList[state.activeIndex].foods.find(item => item.id === action.payload.id) || {count: 0}
            foodItem.count++
        },
        // count增
        increaseCount(state, action) {
            // 关键点：找到当前要修改谁的count id
            const item = state.cartList.find(item => item.id === action.payload.id) || {count: 0}
            item.count++

            const foodItem = state.foodsList[state.activeIndex].foods.find(item => item.id === action.payload.id) || {count: 0}
            foodItem.count++
        },
        // count减
        decreaseCount(state, action) {
            // 关键点：找到当前要修改谁的count id
            const item = state.cartList.find(item => item.id === action.payload.id) || {count: 0}
            if (item.count === 0) return
            item.count--
            if (item.count === 0) {
                state.cartList = state.cartList.filter(cartItem => cartItem.id !== action.payload.id);
            }

            const foodItem = state.foodsList[state.activeIndex].foods.find(item => item.id === action.payload.id) || {count: 0}
            foodItem.count--


        },
        // 清除购物车
        clearCart(state) {
            state.cartList = []

            state.foodsList.forEach(item => {
                item.foods.forEach(food => {
                    food.count = 0
                })
            })
        }
    }
})
export const {setFoodsList, changeActiveIndex, addCart, increaseCount, decreaseCount, clearCart} = foodsStore.actions


// 异步获取部分
export const apiFoodsList = () => {
    return async (dispatch: AppDispatch) => {
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export default foodsStore.reducer
