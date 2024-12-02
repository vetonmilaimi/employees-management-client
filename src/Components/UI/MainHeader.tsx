import { useNavigate } from "react-router-dom";
import { App, Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  BankOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";

import AppIcon from "../../../assets/app-icon.svg";
import {
  AuthUserSlice,
  ErrorResponse,
  IMainHeaderItem,
} from "../../utils/types";
import userService from "../../services/user.service";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import { store } from "../../store/store";
import { useMemo } from "react";
import { USER_ROLES } from "../../utils/constants";

interface IMainHeaderProps {
  authSession: AuthUserSlice;
}

const MainHeader = ({ authSession }: IMainHeaderProps) => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const logoutHandler = async () => {
    try {
      await userService.logout();
      store.dispatch(AuthSliceReducers.logout());
      navigate("/auth/login");
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    }
  };

  const MainHeaderItems: IMainHeaderItem[] = useMemo(() => {
    if (authSession?.user.role === USER_ROLES.MANAGER) {
      return [
        {
          key: "/manager/job-events",
          icon: <ProfileOutlined />,
          label: "Job Events",
          onClick: () => {
            navigate("/manager/job-events");
          },
        },
        {
          key: "/manager/projects",
          icon: <ProjectOutlined />,
          label: "Projects",
          onClick: () => {
            navigate("/manager/projects");
          },
        },
        {
          key: "/manager/employees",
          icon: <UserOutlined />,
          label: "Employees",
          onClick: () => {
            navigate("/manager/employees");
          },
        },
        {
          key: "/manager/organization",
          icon: <BankOutlined />,
          label: "Organization",
          onClick: () => {
            navigate("/manager/organization");
          },
        },
      ];
    } else if (authSession?.user?.role === USER_ROLES.ADMIN) {
      return [
        {
          key: "/admin/organizations",
          icon: <BankOutlined />,
          label: "Organizations",
          onClick: () => navigate("/admin/organizations"),
        },
        {
          key: "/admin/users",
          icon: <UserOutlined />,
          label: "Users",
          onClick: () => navigate("/admin/users"),
        },
      ];
    } else {
      /* 
        Here we should add user specific items in the future
        but for now we will leave it empty just because,
        we don't now exactly what to add
      */
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSession]);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
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
          EMS
        </Typography>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={[
          ...MainHeaderItems,
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

export default MainHeader;
