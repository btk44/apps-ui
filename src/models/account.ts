export enum AccountType {
    Cash = 'cash',
    Bank = 'bank',
    Credit = 'credit',
    Savings = 'savings'
}

export interface Account {
    userId: number
    id: number
    name: string
    code: string
    type: AccountType
    currencyId: number
    icon?: string
    active: boolean
    version: number
}