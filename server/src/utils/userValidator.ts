import { FieldError, UserInput } from "src/types";

const USER_FILED: (keyof UserInput)[] = ["email", "firstname", "password", "username", "lastname"]
const MIN_FIELD_CHAR = 3
// email regex from https://emailregex.com/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/**
 * validation for user entity input
 * @param {UserInput} input 
 * @returns {FieldError}
 */
const userValidator = (input: Partial<UserInput>): FieldError[] => {
    const errors: FieldError[] = []

    for (let field of USER_FILED) {
        const value = input[field] as string
        if (value.length < MIN_FIELD_CHAR) {
            errors.push({
                field,
                message: `give at least ${MIN_FIELD_CHAR} characters to ${field}`
            });
        } else if (field === "email" && !EMAIL_REGEX.test(value)) {
            errors.push({
                field,
                message: 'incorrect email address'
            });
        }
    }

    return errors
}

export default userValidator
