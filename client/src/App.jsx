import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoadmapPage from "./features/Roadmaps/pages/Home";
<<<<<<< HEAD
import InterviewPage from "./features/Interview/pages/Home";
=======
import ResumePage from "./features/Resume/pages/Home";
>>>>>>> 50874ad5b44a12740509fa907b7f809362b852c1

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
<<<<<<< HEAD
        <Route path="/interview" element={<InterviewPage />} />
=======
        <Route path="/resume" element={<ResumePage />} />
>>>>>>> 50874ad5b44a12740509fa907b7f809362b852c1
      </Routes>
    </BrowserRouter>
  );
}
