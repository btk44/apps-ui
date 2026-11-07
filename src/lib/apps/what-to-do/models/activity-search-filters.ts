export interface ActivitySearchFilters {
    name?: string
    latitude?: number
    longitude?: number
    distance?: number
    categories?: string[]
    targets?: string[]
    startDate?: Date
    endDate?: Date
    take?: number
    offset?: number
}