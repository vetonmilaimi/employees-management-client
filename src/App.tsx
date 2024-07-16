import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import SuperAdminHeader from "./Components/SuperAdmin/SuperAdminHeader";
import { USER_ROLES } from "./utils/constants";
import AdminHeader from "./Components/Admin/AdminHeader";

function App() {
  const authSession = useSelector((state: RootState) => state.auth.value);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#76ABAE",
        },
      }}
    >
      <BrowserRouter>
        {authSession.session.accessToken ? (
          authSession.user.role === USER_ROLES.ADMIN ? (
            <AdminHeader />
          ) : (
            <SuperAdminHeader />
          )
        ) : null}
        <RoutesComponent />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
