import StarIcon from "@lucide/svelte/icons/star"
import BikeIcon from "@lucide/svelte/icons/bike"
import { type AppData } from "$lib/components/app-sidebar-common"
import { t } from "./labels"

export const data: AppData =
{
    name: t["act_conf_title"],
    logo: StarIcon,
    description: t["act_conf_desc"],
    navigation: [{
        title: t["act_conf_menu_title"],
        url: "#",
        icon: BikeIcon,
        isActive: true,
        items:[
            {
                title: t["act_conf_menu_add"],
                url: "/what-to-do/form"
            },
            {
                title: t["act_conf_menu_search"],
                url: "/what-to-do/search"
            }
        ]
    }]
}