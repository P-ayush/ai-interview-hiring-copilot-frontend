import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Interview from "./pages/Interview";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterInterviews from "./pages/RecruiterInterviews";
import RecruiterInterview from "./pages/RecruiterInterview";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/applications" element={<Applications />} />

      <Route path="/interview/:id" element={<Interview />} />

      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

      <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />

      <Route path="/recruiter/interview/:id" element={<RecruiterInterview />} />
    </Routes>
  </BrowserRouter>,
);
