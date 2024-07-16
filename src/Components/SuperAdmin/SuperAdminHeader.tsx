import { Menu, Typography } from "antd";
import { BankOutlined, LogoutOutlined } from "@ant-design/icons";
import { store } from "../../store/store";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import userService from "../../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const SuperAdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const logoutHandler = async () => {
    try {
      await userService.logout();
      store.dispatch(AuthSliceReducers.logout());
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header
      style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
    >
      <div onClick={() => navigate("/")}>
        <Typography
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          ALPDECOR
        </Typography>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: "/super-admin/organizations",
            icon: <BankOutlined />,
            label: "Organizations",
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            onClick: logoutHandler,
            label: "Logout",
          },
        ]}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: "end",
          alignItems: "center",
        }}
      />
    </Header>
  );
};

export default SuperAdminHeader;
