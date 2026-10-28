export enum CategoryType {
    Expense = 'expense',
    Income = 'income',
    Both = 'both'
}

export interface Category{
    userId: number
    id: number
    name: string
    code: string
    parentId?: number
    active: boolean
    icon?: string
    type: CategoryType
    version: number
}