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
import AddOrganization from "../Pages/Manager/AddOrganization";
import NotFound from "../Components/UI/NotFound";

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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
