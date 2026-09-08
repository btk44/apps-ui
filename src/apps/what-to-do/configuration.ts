import StarIcon from "@lucide/svelte/icons/star"
import BikeIcon from "@lucide/svelte/icons/bike"
import { type AppData } from "$lib/components/app-sidebar-common"
import { t } from "./labels"

export const data: AppData =
{
    name: t["What To Do"],
    logo: StarIcon,
    description: t["Activities around"],
    navigation: [{
        title: t["Activities"],
        url: "#",
        icon: BikeIcon,
        isActive: true,
        items:[
            {
                title: t["Add new activity"],
                url: "/what-to-do/form"
            },
            {
                title: t["Activities search"],
                url: "/what-to-do/search"
            }
        ]
    }]
}