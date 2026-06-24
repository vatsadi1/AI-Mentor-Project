require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const roadmapRouter = require('./router/roadmapRouter.js')
const interviewRouter = require('./router/interviewRouter.js')
const resumeRouter = require('./router/resumeRouter.js')
const contentRouter = require('./router/contentRouter.js')

app.use("/api/roadmap",roadmapRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/resume", resumeRouter)
app.use("/api/content", contentRouter)
app.use("/api/test",roadmapRouter)


module.exports = app