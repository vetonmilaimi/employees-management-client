import { Route, Routes } from "react-router-dom";
import SuperAdminRoute from "./SuperAdminRoute";
import Organizations from "../Pages/Super_admin/Organizations";
import Projects from "../Pages/Admin/Projects";
import AdminRoute from "./AdminRoute";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<div>Homepage</div>} />
      {/* 
          Super Admin Routes
      */}
      <Route path="super-admin">
        <Route
          path="organizations"
          element={
            <SuperAdminRoute>
              <Organizations />
            </SuperAdminRoute>
          }
        />
      </Route>

      {/* 
          Admin Routes
      */}
      <Route path="admin">
        <Route
          path="projects"
          element={
            <AdminRoute>
              <Projects />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}
