export interface BillState {
    billList: BillItem[]
}

export interface BillItem {
    type: string
    money: number
    date: string
    useFor: string
    id?: number
}
