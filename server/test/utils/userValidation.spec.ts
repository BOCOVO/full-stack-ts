/// <reference types="@types/jest" />;

import userValidator from "../../src/utils/userValidator"

describe("user input validation", () => {

    it("should return username least than 3 characters error", () => {
        const errors = userValidator({
            email: "bocovo@bocovo.com",
            username:"us",
            password: "password",
            firstname: "firstname",
            lastname: "lastname"
        })
        expect(errors[0]?.field).toBe("username")
    })

    it("should not return an error", () => {
        const errors = userValidator({
            email: "bocovo@bocovo.com",
            username:"user",
            password: "password",
            firstname: "firstname",
            lastname: "lastname"
        })
        expect(errors.length).toBe(0)
    })

    it("should return email error", () => {
        const errors = userValidator({
            email: "bocovo.com",
            username:"user",
            password: "password",
            firstname: "firstname",
            lastname: "lastname"
        })
        expect(errors[0]?.field).toBe("email")
    })


})