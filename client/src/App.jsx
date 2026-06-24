import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoadmapPage from "./features/Roadmaps/pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
