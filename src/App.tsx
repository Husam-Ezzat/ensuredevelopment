import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/swiper-bundle.css";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import AuthLayout from "./ui/AuthLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Spinner from "./ui/Spinner";
import Groups from "./pages/Groups";
import Trainees from "./pages/Trainees";
import Reports from "./pages/Reports";
import Invoices from "./pages/Invoices";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const Home = React.lazy(() => import("./pages/Home"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <GlobalStyles direction={i18n.language === "ar" ? "rtl" : "ltr"} />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="invoices"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Invoices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:courseId/groups"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Groups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:courseId/groups/:groupId/trainees"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Trainees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:courseId/groups/:groupId/templates"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Templates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="courses/:courseId/groups/:groupId/builder"
                element={
                  <ProtectedRoute roles={["Member", "Admin", "SuperAdmin", "Moderator"]}>
                    <Builder />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* Authentication routes */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            {/* Unauthorized route */}
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* Fallback routes */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
