import path from "path"
import { DataSource } from "typeorm"

import constants from "./constants"

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