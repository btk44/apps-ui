import { getLastInitTime, getTimeElapsedFromLastInMinutes, loadFromLocalStorage, saveToLocalStorage } from "$lib/code/local-storage"
import { readonly, writable } from "svelte/store"

interface IdNamePair { id: number, name: string }
interface ValueDescPair { value: string, description: string }

const categoriesStore = writable<Array<ValueDescPair>>(loadFromLocalStorage("activity_ls_categories") ?? {})
const targetsStore = writable<Array<ValueDescPair>>(loadFromLocalStorage("activity_ls_targets") ?? {})
const locationStore = writable<Array<ValueDescPair>>(loadFromLocalStorage("activity_ls_targets") ?? {})
const lastInitStore = writable<Date>(getLastInitTime("activity_ls_lastinit") ?? new Date(2000, 1, 1))

export const categoriesStoreReadOnly = readonly(categoriesStore)
export const targetsStoreReadOnly = readonly(targetsStore)

categoriesStore.subscribe((v) => { saveToLocalStorage("activity_ls_categories", v) })
targetsStore.subscribe((v) => { saveToLocalStorage("activity_ls_targets", v) })
lastInitStore.subscribe((v) => { saveToLocalStorage("activity_ls_lastinit", v) })

export const initDataStore = async (forceReload?: boolean) => {
    // if(getTimeElapsedFromLastInMinutes("activity_ls_lastinit") < 520 && !forceReload)
    //     return await Promise.resolve()

    // const categoriesCall = ActivityService.GetCategories()
    // const targetsCall = ActivityService.GetTargets()

    // try {
    //     const [categoriesResponse, targetsResponse] = await Promise.all([categoriesCall, targetsCall])
    //     categoriesStore.set(categoriesResponse.map((x: IdNamePair) => ({value: x.id.toString(), description: x.name})))
    //     targetsStore.set(targetsResponse.map((x: IdNamePair) => ({value: x.id.toString(), description: x.name})))

    //     lastInitStore.set(new Date())
    // }
    // catch {
    //     console.log("There was an error loading data to the store")
    // }

}