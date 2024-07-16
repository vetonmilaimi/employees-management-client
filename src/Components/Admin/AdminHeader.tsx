import { Menu, Typography } from "antd";
import { ProjectOutlined, LogoutOutlined } from "@ant-design/icons";
import { store } from "../../store/store";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import userService from "../../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const AdminHeader = () => {
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
      style={{
        display: "flex",
        alignItems: "center",
      }}
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
            key: "/projects",
            icon: <ProjectOutlined />,
            label: "Projects",
            onClick: () => {
              navigate("/projects");
            },
          },
          {
            key: "/employees",
            icon: <ProjectOutlined />,
            label: "Employees",
            onClick: () => {
              navigate("/employees");
            },
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
          justifyItems: "center",
        }}
      />
    </Header>
  );
};

export default AdminHeader;
