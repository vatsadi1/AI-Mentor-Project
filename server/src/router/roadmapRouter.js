const express = require('express')
const { generateRoadmap } = require('../controller/roadmapController')

const roadmapRouter = express.Router()

/**
 * POST --> /generate
 * 
 * this is use to post the 
 */
roadmapRouter.post('/generate',generateRoadmap)

 


module.exports = roadmapRouter