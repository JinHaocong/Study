export interface CartItem {
    id: string
    count: number
    picture: string
    name: string
    price: number
}

export interface Food {
    id: number
    name: string
    like_ratio_desc: string
    month_saled: number
    unit: string
    food_tag_list: string[]
    price: number
    picture: string
    description: string
    tag: string
    count: number
}

export interface FoodItemType {
    tag?: string,
    name: string,
    foods: Food[]
}

export interface FoodState {
    foodsList: FoodItemType[]
    activeIndex: number
    cartList: CartItem[]
}
