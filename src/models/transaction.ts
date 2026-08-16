export enum Direction {
    Debit = 'debit',
    Credit = 'credit'
}

export interface Transaction {
    id: number
    userId: number
    amount: number
    direction: Direction
    accountId: number
    categoryId: number
    date: Date
    comment: string
    active: boolean
    transferId: number | null
    version: number
}

export function GetEmptyTransaction() : Transaction {
    return {
        id: 0,
        userId: 1,
        amount: 0,
        direction: Direction.Debit,
        accountId: 0,
        categoryId: 0,
        date: new Date(),
        comment: '',
        active: true,
        transferId: null,
        version: 1
    }
}

export function CopyTransaction(sourceTransaction: Transaction): Transaction {
    return {
        id: sourceTransaction.id,
        userId: sourceTransaction.userId,
        amount: sourceTransaction.amount,
        direction: sourceTransaction.direction,
        accountId: sourceTransaction.accountId,
        categoryId: sourceTransaction.categoryId,
        date: structuredClone(sourceTransaction.date),
        comment: sourceTransaction.comment,
        active: sourceTransaction.active,
        transferId: sourceTransaction.transferId,
        version: sourceTransaction.version
    }
}