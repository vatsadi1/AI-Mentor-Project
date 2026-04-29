require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const roadmapRouter = require('./router/roadmapRouter.js')

app.use("/api/roadmap",roadmapRouter)
app.use("/api/test",roadmapRouter)


module.exports = app