import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Organizations from "../Pages/Super_admin/Organizations";
import Projects from "../Pages/Admin/Projects";
import Login from "../Pages/Auth/Login";
import NonAuthRoute from "./NonAuthRoute";
import Employees from "../Pages/Admin/Employees";
import Users from "../Pages/Super_admin/Users";
import Activate from "../Pages/Auth/Activate";

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
          Super Admin Routes
      */}
      <Route path="super-admin">
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
          Admin Routes
      */}
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
    </Routes>
  );
}
