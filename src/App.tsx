import { ConfigProvider, App as AntDApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import SuperAdminHeader from "./Components/SuperAdmin/SuperAdminHeader";
import { USER_ROLES } from "./utils/constants";
import AdminHeader from "./Components/Admin/AdminHeader";
import CustomModal from "./Components/UI/Modal";

function App() {
  const authSession = useSelector((state: RootState) => state.auth.value);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#76ABAE",
        },
        components: {
          Typography: {
            colorPrimary: "#fff",
          },
        },
      }}
    >
      <AntDApp>
        <BrowserRouter>
          {authSession?.session?.accessToken ? (
            authSession?.user?.role === USER_ROLES.ADMIN ? (
              <AdminHeader />
            ) : (
              <SuperAdminHeader />
            )
          ) : null}
          <CustomModal />
          <RoutesComponent />
        </BrowserRouter>
      </AntDApp>
    </ConfigProvider>
  );
}

export default App;
