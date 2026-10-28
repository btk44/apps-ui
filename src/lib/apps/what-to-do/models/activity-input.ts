export interface ActivityInput {
    id: number
    name: string
    description: string
    country: string
    region: string
    city: string
    address: string
    mapUrl: string
    url: string
    startDate: Date
    endDate: Date
    categories: string[]
    targets: string[]
    // there are more but not needed for now    
}