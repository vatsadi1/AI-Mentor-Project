const  generateRoadmapAgent = require("../ai/roadmapAgent.js");
async function generateRoadmap(req, res) {
  let roadmap
  try {
    const {
      role,
      techStack,
      level,
      timeCommitment,
      deadline,
      goalType,
      projects
    } = req.body;

    // Required fields check
    if (!role || !techStack || !level || !timeCommitment || !deadline || !goalType || !projects) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Type checks
    if (!Array.isArray(techStack)) {
      return res.status(400).json({
        message: "techStack must be an array"
      });
    }

    // Enum validation
    const validLevels = ["beginner", "intermediate", "advanced"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        message: "Invalid level"
      });
    }

    const validGoals = ["job", "freelance", "project", "interview"];
    if (!validGoals.includes(goalType)) {
      return res.status(400).json({
        message: "Invalid goal type"
      });
    }

    const validProjects = ["yes", "no"];
    if (!validProjects.includes(projects)) {
      return res.status(400).json({
        message: "Invalid project preference"
      });
    }

    // Normalize
    const cleanedData = {
      role: role.trim(),
      techStack: techStack.map(t => t.trim().toLowerCase()),
      level,
      timeCommitment: timeCommitment.trim(),
      deadline: deadline.trim(),
      goalType,
      projects
    };

     // 🔥 CALL AI
     roadmap = await generateRoadmapAgent(cleanedData);


  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
  res.status(200).json({    message: "Roadmap generated successfully",
    roadmap
  });
}

module.exports = {
  generateRoadmap, 
};