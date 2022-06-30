/**
 * Store value in localStorage object 
 * return true if done and false if not
 * 
 * @param key 
 * @param value 
 * @returns 
 */
export const setLocalStorage = (key: string, value: string): boolean => {
  if (window) {
    window.localStorage.setItem(key, value)
    return true
  }
  return false;
}

export const getLocalStorage = (key: string) : string|false|null => {
  if (window) {
    return window.localStorage.getItem(key)
  }
  return false;
}