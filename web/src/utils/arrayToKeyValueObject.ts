type Object = {
    [key:string] : string
}
/**
 * transform list to object
 * 
 * @param list 
 * @param key the key of the value to index the result
 * @param value the key of the value of the index
 * @returns 
 */
const arrayToKeyValueObject =  <T extends Object > (list: T[], key: keyof T,value: keyof T) => {
    const result:Object = {}
    for (const item of list) {
        result[item[key]] = item[value]
    }
    return result
}
export default arrayToKeyValueObject