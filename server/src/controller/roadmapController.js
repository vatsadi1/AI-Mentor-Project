const generateRoadmapAgent = require("../ai/roadmapAgent.js");
const roadmapModel = require("../model/roadmap.model.js");

async function generateRoadmap(req, res) {
  try {
    const {
      role,
      techStack,
      level,
      timeCommitment,
      deadline,
      goalType,
      projects,
    } = req.body;

    // validation
    if (
      !role ||
      !techStack ||
      !level ||
      !timeCommitment ||
      !deadline ||
      !goalType ||
      !projects
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(techStack)) {
      return res.status(400).json({ message: "techStack must be an array" });
    }

    const validLevels = ["beginner", "intermediate", "advanced"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ message: "Invalid level" });
    }

    const validGoals = ["job", "freelance", "project", "interview"];
    if (!validGoals.includes(goalType)) {
      return res.status(400).json({ message: "Invalid goal type" });
    }

    const validProjects = ["yes", "no"];
    if (!validProjects.includes(projects)) {
      return res.status(400).json({ message: "Invalid project preference" });
    }

    // normalize
    const cleanedData = {
      role: role.trim(),
      techStack: techStack.map((t) => t.trim().toLowerCase()),
      level,
      timeCommitment: timeCommitment.trim(),
      deadline: deadline.trim(),
      goalType,
      projects,
    };

    // 🔥 call AI
    const roadmap = await generateRoadmapAgent(cleanedData);

    // 🔥 validate AI output
    if (!Array.isArray(roadmap)) {
      return res.status(500).json({
        message: "AI returned invalid format",
      });
    }

    // 🔥 save EVERYTHING
    const roadmapDoc = await roadmapModel.create({
      ...cleanedData,
      roadmap: roadmap,
    });

    // ✅ send response INSIDE try
    return res.status(200).json({
      message: "Roadmap generated successfully",
      roadmap: roadmapDoc.roadmap,
      roadmap:roadmap,
      id: roadmapDoc._id,
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = {
  generateRoadmap,
};