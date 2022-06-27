import path from "path"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

import constants from "./constants"

dotenv.config({
    path: path.resolve(__dirname,
        `../.env.${process.env.NODE_ENV || "development"}`
    ),
    debug: process.env.NODE_ENV === "development"
})

// app data source
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    entities: [path.join(__dirname, "../dist//entities/**/*.js")],
    migrations: [path.join(__dirname, "../dist/migrations/**/*.js")],
    logging: !constants.__prod__,
})

export default AppDataSource;