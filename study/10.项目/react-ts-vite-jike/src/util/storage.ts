interface Items {
    [key: string]: any
}

export const setItem = (key: string, value: any) => {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
}

export const setItems = (obj: Items) => {
    for (const [key, value] of Object.entries(obj)) {
        setItem(key, value)
    }
}

export const getItem = (key: string) => {
    const storedValue = localStorage.getItem(key)

    if (storedValue !== null) return JSON.parse(storedValue)
    return null
}

export const getItems = (keys: string[]): Items => {
    const result: Items = {}

    keys.forEach((key) => {
        const storedValue = getItem(key)

        result[key] = storedValue ? JSON.parse(storedValue) : null
    })

    return result
}

export const removeItem = (key: string) => {
    localStorage.removeItem(key)
}

export const removeItems = (keys: string[]) => {
    keys.forEach((key) => {
        removeItem(key)
    })
}

export const setSessionItem = (key: string, value: any) => {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(key, serializedValue)
}

export const setSessionItems = (obj: Items) => {
    for (const [key, value] of Object.entries(obj)) {
        setSessionItem(key, value)
    }
}

export const getSessionItem = (key: string) => {
    const storedValue = sessionStorage.getItem(key)

    if (storedValue !== null) return JSON.parse(storedValue)
    return null
}

export const getSessionItems = (keys: string[]): Items => {
    const result: Items = {}

    keys.forEach((key) => {
        const storedValue = getSessionItem(key)

        result[key] = storedValue ? JSON.parse(storedValue) : null
    })

    return result
}

export const removeSessionItem = (key: string) => {
    sessionStorage.removeItem(key)
}

export const removeSessionItems = (keys: string[]) => {
    keys.forEach((key) => {
        removeSessionItem(key)
    })
}

export const clearLocal = () => {
    localStorage.clear()
}

export const clearSession = () => {
    sessionStorage.clear()
}
