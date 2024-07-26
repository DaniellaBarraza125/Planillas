import "dotenv/config"
import express from "express"
import cors from "cors"
import  {router}   from "./routes"
import db from "./config/config"
import { handleTypeError } from "./utils/error.handle"
const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(handleTypeError);

app.use(cors())
app.use(router)


db().then(()=>{console.log("DB connected")})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
