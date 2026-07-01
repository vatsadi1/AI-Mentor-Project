import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoadmapPage from "./features/Roadmaps/pages/Home";
import InterviewPage from "./features/Interview/pages/Home";
import ResumePage from "./features/Resume/pages/Home";

import ContentPage from "./features/Content/pages/Home";
import CodeReviewPage from "./features/CodeReviewer/pages/Home";
import PracticeGroupPage from "./features/PracticeGroup/pages/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/code-review" element={<CodeReviewPage />} />
          <Route
            path="/practice-group"
            element={
              <ProtectedRoute>
                <PracticeGroupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice-group/join/:roomCode"
            element={
              <ProtectedRoute>
                <PracticeGroupPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
