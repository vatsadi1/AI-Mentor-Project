require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const roadmapRouter = require('./router/roadmapRouter.js')

const interviewRouter = require('./router/interviewRouter.js')

const resumeRouter = require('./router/resumeRouter.js')


app.use("/api/roadmap",roadmapRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/test",roadmapRouter)
app.use("/api/resume", resumeRouter)


module.exports = app