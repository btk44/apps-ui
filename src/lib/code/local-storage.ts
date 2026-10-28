const LocalStorage = typeof window !== "undefined" ? window.localStorage : null

export const loadFromLocalStorage = <T = unknown, R = T>(key: string, additionalActionOnValue: ((value: T) => R) | null = null) => {
    if(!LocalStorage) return null

    const localStorageString = LocalStorage.getItem(key)

    if (localStorageString === null) return null 

    let value = JSON.parse(localStorageString)
    if(additionalActionOnValue !== null)
        value = additionalActionOnValue(value)

    return value
}

export const saveToLocalStorage = (key: string, value: unknown) => {
    if(!LocalStorage) return

    LocalStorage.setItem(key, JSON.stringify(value));
}
  
export const removeFromLocalStorage = (key: string) => {
    if(!LocalStorage) return

    LocalStorage.removeItem(key);
}

export const getLastInitTime = (lastInitKey: string) => { 
    return loadFromLocalStorage(lastInitKey, (dateStr: string) => { return new Date(dateStr) }) 
}

export const getTimeElapsedFromLastInMinutes = (lastInitKey:  string) => {
    const lastInit = getLastInitTime(lastInitKey)
    const now = new Date()
    return ( (+now - +lastInit) / 1000 / 60 )
}