import { Menu, Typography } from "antd";
import { BankOutlined, LogoutOutlined } from "@ant-design/icons";
import { store } from "../../store/store";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import AppIcon from "../../../assets/app-icon.svg";

const SuperAdminHeader = () => {
  const navigate = useNavigate();

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
      <div className="flex flex-1 items-center" onClick={() => navigate("/")}>
        <img src={AppIcon} className="max-w-[50px] max-h-[50px] mr-2" />
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
        selectable={false}
        items={[
          {
            key: "/super-admin/organizations",
            icon: <BankOutlined />,
            label: "Organizations",
            onClick: () => navigate("/super-admin/organizations"),
          },
          {
            key: "/super-admin/users",
            icon: <BankOutlined />,
            label: "Users",
            onClick: () => navigate("/super-admin/users"),
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
