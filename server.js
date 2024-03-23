if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const IndexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use("/", IndexRouter)

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", ()=> console.log("Connected to Mongoose"))

app.listen(process.env.PORT || 3000)

