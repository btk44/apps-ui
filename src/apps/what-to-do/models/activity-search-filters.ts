export interface ActivitySearchFilters {
    id: number
    name: string
    description: string
    mapUrl: string
    url: string
    startDate: Date
    endDate: Date
    categories: string[]
    targets: string[]
    // there are more but not needed for now    
}