import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/login.jsx";
import Jobs from "./pages/TempJobs.jsx";
import Applications from "./pages/Applications.jsx";
import Interview from "./pages/Interview.jsx";
import RecruiterInterviews from "./pages/RecruiterInterviews.jsx";
import RecruiterInterview from "./pages/RecruiterInterview.jsx";
import RecruiterJobs from "./pages/RecruiterJobs.jsx";
import RecruiterApplicants from "./pages/RecruiterApplicants.jsx";
import CreateJob from "./pages/CreateJob.jsx";
import UploadResume from "./pages/UploadResume.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute role="candidate">
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute role="candidate">
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview/:id"
        element={
          <ProtectedRoute role="candidate">
            <Interview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/interviews"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterInterviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/interview/:id"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/job/:jobId/applications"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterApplicants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs/create"
        element={
          <ProtectedRoute role="recruiter">
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute role="candidate">
            <UploadResume />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
);
