import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import user from "./routes/user.js"
import report from "./routes/report.js"
import article from "./routes/article.js"
import comment from "./routes/comment.js"

dotenv.config()
const app = express()

app.use(cors({
    origin: ["https://vandad3.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb+srv://mongodbacc10:38312132sS@cluster0.oml4jek.mongodb.net/Vandad")
    .then(res =>
        console.log("database connected")
    )
    .catch(err => {
        console.log("database disconnnected")
    })
app.listen("3000", () => {
    console.log("server is running")
})

app.use("/api" , user)
app.use("/api" , report)
app.use("/api" , article)
app.use("/api" , comment)

// 404 ERROR
app.use((req, res) => {
    res.send("<h1 style=color : 'red';>404 Error</h1>")
})
