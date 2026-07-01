require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.json({ limit: "1mb" }))
app.use(cors())

const roadmapRouter = require('./router/roadmapRouter.js')
const interviewRouter = require('./router/interviewRouter.js')
const resumeRouter = require('./router/resumeRouter.js')
const contentRouter = require('./router/contentRouter.js')
const authRouter = require('./router/authRouter.js')
const codeReviewRouter = require('./router/codeReviewRouter.js')
const practiceGroupRouter = require('./router/practiceGroupRouter.js')



app.use("/api/roadmap",roadmapRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/resume", resumeRouter)

app.use("/api/content", contentRouter)
app.use("/api/test",roadmapRouter)

app.use("/api/auth", authRouter)
app.use("/api/code-review", codeReviewRouter)
app.use("/api/practice-group", practiceGroupRouter)



module.exports = app