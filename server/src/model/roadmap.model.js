const mongoose = require('mongoose');

const roadmapSchema =  new mongoose.Schema({
    role:{ type: String, required: true },
    techStack: [{ type: String, required: true }],
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    timeCommitment: { type: String, required: true },
    deadline: { type: String, required: true },
    goalType: { type: String, enum: ['job', 'freelance', 'project', 'interview'], required: true },
    projects: { type: String, enum: ['yes', 'no'], required: true },
    createdAt: { type: Date, default: Date.now },
    roadmap: [
  {
    week: String,
    title: String,
    topics: [String],
    tasks: [String],
    project: String,
  },
]
})

const roadmapModel  = mongoose.model("Roadmap", roadmapSchema)
module.exports = roadmapModel;
