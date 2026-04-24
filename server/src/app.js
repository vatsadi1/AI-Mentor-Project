require('dotenv').config()
const express = require("express")
const app = express()
app.use(express.json())

const roadmapRouter = require('./router/roadmapRouter.js')

app.use("/api/roadmap",roadmapRouter)
app.use("/api/test",roadmapRouter)


module.exports = app