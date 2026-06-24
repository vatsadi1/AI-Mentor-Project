require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const roadmapRouter = require('./router/roadmapRouter.js')
<<<<<<< HEAD
const interviewRouter = require('./router/interviewRouter.js')
=======
const resumeRouter = require('./router/resumeRouter.js')
>>>>>>> 50874ad5b44a12740509fa907b7f809362b852c1

app.use("/api/roadmap",roadmapRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/test",roadmapRouter)
app.use("/api/resume", resumeRouter)


module.exports = app