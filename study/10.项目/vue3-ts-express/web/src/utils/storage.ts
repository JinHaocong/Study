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
