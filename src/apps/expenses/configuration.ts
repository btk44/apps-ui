import EuroIcon from "@lucide/svelte/icons/euro"
import { type AppData } from "$lib/components/app-sidebar-common"
import WalletIcon from "@lucide/svelte/icons/wallet"
import {t} from "./labels"

export const data: AppData =
{
    name: t["Expenses"],
    logo: EuroIcon,
    description: t["Track your money"],
    navigation: [{
        title: t["Expenses"],
        url: "#",
        icon: WalletIcon,
        isActive: true,
        items:[
            {
                title: t["Transactions"],
                url: "/expenses/transactions"
            },
            {
                title: t["Accounts"],
                url: "/expenses/accounts"
            },
            {
                title: t["Categories"],
                url: "/expenses/categories"
            },
            {
                title: t["Currencies"],
                url: "/expenses/currencies"
            }
        ]
    }]
}