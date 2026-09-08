export interface NavGroup {
    title: string
    url: string
    icon: any
    isActive: boolean
    items?: NavItem[]
}

export interface NavItem {
    title: string
    url: string
}

export interface AppData { 
    name: string 
    logo: any
    description: string 
    navigation: NavGroup[]
}