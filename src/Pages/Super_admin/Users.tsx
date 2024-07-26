import { App, Button, Space, Spin, Table, TableProps } from "antd";
import { ErrorResponse, IUser } from "../../utils/types";
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { USER_ROLES } from "../../utils/constants";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import { store } from "../../store/store";
import AddUser from "../../Components/Forms/AddUser.form";

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
            className="bg-red-500 text-white"
            type="default"
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

  const addUser = () => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: <AddUser />,
      })
    );
  };

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
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <div className="max-w-100 py-3 px-1 my-2 bg-white flex justify-end rounded-md">
        <Button type="primary" onClick={addUser}>
          Add a user
        </Button>
      </div>
      <Table
        loading={
          loading && {
            indicator: <Spin size="large" />,
          }
        }
        tableLayout="fixed"
        columns={columns}
        dataSource={users}
        pagination={false}
      />
    </div>
  );
};

export default Users;
