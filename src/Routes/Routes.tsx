import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Organizations from "../Pages/Super_admin/Organizations";
import Projects from "../Pages/Admin/Projects";
import Login from "../Pages/Auth/Login";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<div>Homepage</div>} />
      <Route path="auth">
        <Route path="login" element={<Login />} />
      </Route>
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
      </Route>

      {/* 
          Admin Routes
      */}
      <Route path="admin">
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  );
}
