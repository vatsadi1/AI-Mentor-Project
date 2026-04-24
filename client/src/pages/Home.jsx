import { useState } from "react";

const Home= () => {
  const [formData, setFormData] = useState({
    role: "",
    techStack: "",
    level: "beginner",
    timeCommitment: "",
    deadline: "",
    goalType: "job",
    projects: "yes",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const processedData = {
    ...formData,
    role: formData.role.trim(),
    techStack: formData.techStack
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean), // 🔥 removes empty values
    timeCommitment: formData.timeCommitment.trim(),
    deadline: formData.deadline.trim(),
  };

  // Frontend guard (don’t even hit backend with junk)
  if (
    !processedData.role ||
    processedData.techStack.length === 0 ||
    !processedData.timeCommitment ||
    !processedData.deadline
  ) {
    alert("Fill all fields correctly");
    return;
  }

  console.log("Final Data:", processedData);

  // reset
  setFormData({
    role: "",
    techStack: "",
    level: "beginner",
    timeCommitment: "",
    deadline: "",
    goalType: "job",
    projects: "yes",
  });
};

  return (
    <div className="max-w-xl mx-auto p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Generate Your Roadmap</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Target Role */}
        <input
          type="text"
          name="role"
          placeholder="Target Role (e.g. Frontend Developer)"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Tech Stack */}
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated: React, Node, etc)"
          value={formData.techStack}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Level */}
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Time Commitment */}
        <input
          type="text"
          name="timeCommitment"
          placeholder="Hours per week (e.g. 10 hrs/week)"
          value={formData.timeCommitment}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Deadline */}
        <input
          type="text"
          name="deadline"
          placeholder="Deadline (e.g. 3 months)"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Goal Type */}
        <select
          name="goalType"
          value={formData.goalType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="job">Job</option>
          <option value="freelance">Freelance</option>
          <option value="project">Personal Project</option>
          <option value="interview">Interview Prep</option>
        </select>

        {/* Project Preference */}
        <select
          name="projects"
          value={formData.projects}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="yes">Include Projects</option>
          <option value="no">No Projects</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Generate Roadmap
        </button>
      </form>
    </div>
  );
};

export default Home;