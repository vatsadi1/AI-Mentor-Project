import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const Home = () => {
  const [formData, setFormData] = useState({
    role: "",
    techStack: "",
    level: "beginner",
    timeCommitment: "",
    deadline: "",
    goalType: "job",
    projects: "yes",
  });

  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      role: formData.role.trim(),
      techStack: formData.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      timeCommitment: formData.timeCommitment.trim(),
      deadline: formData.deadline.trim(),
    };

    if (
      !processedData.role ||
      processedData.techStack.length === 0 ||
      !processedData.timeCommitment ||
      !processedData.deadline
    ) {
      alert("Fill all fields correctly");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/roadmap/generate",
        processedData
      );

      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
      alert("Error generating roadmap");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DOWNLOAD PDF
  const downloadPDF = () => {
    if (!roadmap.length) return;

    const doc = new jsPDF();
    let y = 10;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text("AI Roadmap", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Goal: ${formData.goalType}`, 10, y);
    y += 5;
    doc.text(`Projects: ${formData.projects}`, 10, y);
    y += 8;

    roadmap.forEach((week) => {
      if (y > 270) {
        doc.addPage();
        y = 10;
      }

      doc.setFont("Helvetica", "bold");
      doc.text(`${week.week} - ${week.title}`, 10, y);
      y += 6;

      doc.setFont("Helvetica", "normal");

      doc.text("Topics:", 10, y);
      y += 5;
      week.topics?.forEach((t) => {
        doc.text(`- ${t}`, 12, y);
        y += 5;
      });

      doc.text("Tasks:", 10, y);
      y += 5;
      week.tasks?.forEach((t) => {
        doc.text(`- ${t}`, 12, y);
        y += 5;
      });

      if (formData.projects === "yes") {
        doc.text(`Project: ${week.project}`, 10, y);
        y += 10;
      }
    });

    doc.save("roadmap.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">AI Roadmap Builder</h1>
        <span className="text-sm text-gray-500">
          Build your learning path
        </span>
      </header>

      <div className="grid md:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Setup</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="role"
              placeholder="Target Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="techStack"
              placeholder="Tech Stack (React, Node)"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

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

            <input
              type="text"
              name="timeCommitment"
              placeholder="2 hrs/day"
              value={formData.timeCommitment}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="deadline"
              placeholder="3 months"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            {/* GOAL TYPE */}
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

            {/* PROJECT OPTION */}
            <select
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="yes">Include Projects</option>
              <option value="no">No Projects</option>
            </select>

            <button className="w-full bg-black text-white p-2 rounded">
              {loading ? "Generating..." : "Generate Roadmap"}
            </button>

          </form>
        </div>

        {/* ROADMAP */}
        <div className="bg-white p-6 rounded-xl shadow">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Roadmap</h2>

            {roadmap.length > 0 && (
              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Download PDF
              </button>
            )}
          </div>

          {/* META INFO */}
          {roadmap.length > 0 && (
            <div className="mb-4 text-sm text-gray-600 flex gap-4 flex-wrap">
              <span>🎯 Goal: <b>{formData.goalType}</b></span>
              <span>📦 Projects: <b>{formData.projects}</b></span>
              <span>📈 Level: <b>{formData.level}</b></span>
            </div>
          )}

          {!loading && roadmap.length === 0 && (
            <p className="text-gray-400 text-sm">
              Generate a roadmap to see results
            </p>
          )}

          {loading && (
            <p className="text-gray-500">Generating...</p>
          )}

          <div className="space-y-4">
            {roadmap.map((week, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 hover:shadow-md"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{week.week}</h3>
                  <span className="text-xs text-gray-400">
                    Step {i + 1}
                  </span>
                </div>

                <p className="text-sm font-medium mb-2">
                  {week.title}
                </p>

                <div className="mb-2">
                  <p className="text-xs text-gray-500">Topics</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {week.topics?.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-xs text-gray-500">Tasks</p>
                  <ul className="list-disc ml-5 text-sm">
                    {week.tasks?.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {formData.projects === "yes" && (
                  <div>
                    <p className="text-xs text-gray-500">Project</p>
                    <p className="text-sm">{week.project}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;