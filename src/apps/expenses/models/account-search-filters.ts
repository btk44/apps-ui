export interface AccountSearchFilters {
    userId?: number
    currencies?: Array<number>
    codes?: Array<string>
    ids?: Array<number>
    name?: string
    active?: boolean
    take?: number
    offset?: number
}