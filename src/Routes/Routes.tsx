import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Organizations from "../Pages/Admin/Organizations";
import Projects from "../Pages/Manager/Projects";
import Login from "../Pages/Auth/Login";
import NonAuthRoute from "./NonAuthRoute";
import Employees from "../Pages/Manager/Employees";
import Users from "../Pages/Admin/Users";
import Activate from "../Pages/Auth/Activate";
import Organization from "../Pages/Manager/Organization";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />

      <Route
        path="auth/login"
        element={
          <NonAuthRoute>
            <Login />
          </NonAuthRoute>
        }
      />

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
      </Route>
    </Routes>
  );
}
