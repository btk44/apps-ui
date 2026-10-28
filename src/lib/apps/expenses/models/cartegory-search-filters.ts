export interface CategorySearchFilters {
    userId?: number
    ids?: Array<number>
    codes?: Array<string>
    name?: string
    parentId?: number
    active?: boolean
    take?: number
    offset?: number
  }