import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoadmapPage from "./features/Roadmaps/pages/Home";
import InterviewPage from "./features/Interview/pages/Home";
import ResumePage from "./features/Resume/pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

        <Route path="/interview" element={<InterviewPage />} />

        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}
