export interface TransactionSearchFilters {
    userId?: number
    id?: number
    amountFrom?: number
    amountTo?: number
    categories?: Array<number>
    accounts?: Array<number>
    dateFrom?: Date
    dateTo?: Date
    comment?: string  
    active?: boolean
    take?: number
    offset?: number
  }