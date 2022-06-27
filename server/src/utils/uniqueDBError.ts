import { DBInsertionError, FieldError } from "src/types"
/**
 * check if there are unique error from database
 * @param error 
 * @param fields 
 * @returns 
 */
const uniqueDBError = (error: DBInsertionError, fields: string[]): FieldError | void => {
    if (error.code || error.detail) {
        for (let field of fields) {
            const included = error.detail?.includes(`(${field})=`)
            if (included) {
                return {
                    field,
                    message: `the given value for ${field} is already taken`
                } as FieldError
            }
        }
    }
}

export default uniqueDBError