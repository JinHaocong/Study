export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

export const setItems = (keys: Array<string>, values: Array<any>) => {
  if (keys.length !== values.length) {
    throw new Error('Keys and values arrays must have the same length')
  }

  keys.forEach((key, index) => {
    const value = values[index]
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  })
}
