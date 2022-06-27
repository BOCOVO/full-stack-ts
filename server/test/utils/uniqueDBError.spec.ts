/// <reference types="@types/jest" />;

import uniqueDBError from "../../src/utils/uniqueDBError"

const TEST_FILED = ["username","email"]

describe("database unique error",()=>{
    it("should return username error",()=>{
        const error = uniqueDBError({
            code:"23505",
            detail:"La clé « (username)=(bocovo) » existe déjà"
        },TEST_FILED)
        expect(error).toBeDefined()
        expect(error?.field).toBe("username")
    })

    it("should not return any error",()=>{
        const error = uniqueDBError({
            code:"23505",
            detail:"La clé « (nothing)=(bocovo) » existe déjà"
        },TEST_FILED)
        expect(error).toBeUndefined()
    })

    it("should not return any error",()=>{
        const error = uniqueDBError({},TEST_FILED)
        expect(error).toBeUndefined()
    })

})