import { App, Button, Space, Spin, Table, TableProps } from "antd";
import { ErrorResponse, IUser } from "../../utils/types";
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { USER_ROLES } from "../../utils/constants";
// import { LoadingOutlined } from "@ant-design/icons";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const { notification } = App.useApp();

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      key: "firstName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            disabled={record.role === USER_ROLES.SUPER_ADMIN}
            // type={record.role === USER_ROLES.SUPER_ADMIN ? "text" : "default"}
            style={
              record.role !== USER_ROLES.SUPER_ADMIN
                ? {
                    color: "white",
                    backgroundColor: "#f00",
                  }
                : {}
            }
            onClick={() => {
              deleteUser(record._id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await userService.list();
      setUsers(
        response.message.map((el) => {
          return { ...el, key: el._id };
        })
      );
    } catch (error: unknown) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (_id: string) => {
    setLoading(true);
    try {
      const response = await userService.delete({
        query: {
          _id,
        },
      });
      if (!response.error) getUsers();
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "auto",
        marginTop: "1rem",
      }}
    >
      <Table
        loading={
          loading && {
            indicator: <Spin size="large" />,
          }
        }
        tableLayout="auto"
        columns={columns}
        dataSource={users}
        pagination={false}
      />
    </div>
  );
};

export default Users;
