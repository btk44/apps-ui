export interface ActivitySearchItem {
    id: number
    name: string
    description: string
    mapUrl: string
    url: string
    startDate: Date | null
    endDate: Date | null
    categories: string[]
    targets: string[]
    // there are more but not needed for now    
}