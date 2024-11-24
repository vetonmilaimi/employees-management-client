import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import NonAuthRoute from "./NonAuthRoute";

const Organizations = lazy(() => import("../Pages/Admin/Organizations"));
const Login = lazy(() => import("../Pages/Auth/Login"));
const Employees = lazy(() => import("../Pages/Manager/Employees"));
const Users = lazy(() => import("../Pages/Admin/Users"));
const Activate = lazy(() => import("../Pages/Auth/Activate"));
const Organization = lazy(() => import("../Pages/Manager/Organization"));
const AddOrganization = lazy(() => import("../Pages/Manager/AddOrganization"));
const NotFound = lazy(() => import("../Components/UI/NotFound"));
const Projects = lazy(() => import("../Pages/Manager/Projects"));
const JobEvents = lazy(() => import("../Pages/Manager/JobEvents"));

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />

      <Route path="auth">
        <Route
          path="login"
          element={
            <NonAuthRoute>
              <Login />
            </NonAuthRoute>
          }
        />
      </Route>

      <Route
        path="activate"
        element={
          <NonAuthRoute>
            <Activate />
          </NonAuthRoute>
        }
      />

      {/* 
          Admin Routes
      */}
      <Route path="admin">
        <Route
          path="organizations"
          element={
            <PrivateRoute>
              <Organizations />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
      </Route>

      {/* 
          Manager Routes
      */}
      <Route path="manager">
        <Route
          path="add-organization"
          element={
            <PrivateRoute>
              <AddOrganization />
            </PrivateRoute>
          }
        />

        <Route
          path="projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />

        <Route
          path="organization"
          element={
            <PrivateRoute>
              <Organization />
            </PrivateRoute>
          }
        />

        <Route
          path="job-events"
          element={
            <PrivateRoute>
              <JobEvents />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
