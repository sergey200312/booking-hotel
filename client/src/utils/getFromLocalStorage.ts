export const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key) || null
}