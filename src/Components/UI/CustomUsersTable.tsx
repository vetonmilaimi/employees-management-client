import { App, Button, Popconfirm, Space, Table, TableProps } from "antd";
import { ErrorResponse, IUser } from "../../utils/types";
import { APP_URL, USER_ROLES } from "../../utils/constants";
import AppTexts from "../../utils/texts/app-texts.json";
import adminService from "../../services/admin.service";

interface ICustomUsersTableProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dataSource: Array<IUser>;
  getUsers: () => void;
  currentRole: USER_ROLES;
}

function CustomUsersTable({
  loading,
  setLoading,
  dataSource,
  getUsers,
  currentRole,
}: ICustomUsersTableProps) {
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
      title: "Activation Status",
      dataIndex: "verifyToken",
      key: "verifyToken",
      render: (_, record) => {
        if (record.activateToken) {
          return `${APP_URL}/activate?token=${record.activateToken}`;
        } else {
          return <>Activated</>;
        }
      },
      hidden: currentRole !== USER_ROLES.ADMIN,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={AppTexts.users_page["delete-user"]}
            onConfirm={() => deleteUser(record._id)}
            onCancel={() => {}}
            okText={AppTexts.global.yes}
            cancelText={AppTexts.global.no}
          >
            <Button
              disabled={record.role === USER_ROLES.ADMIN}
              className="bg-red-500 text-white"
              type="default"
              onClick={() => {}}
            >
              {AppTexts.global.delete}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteUser = async (_id: string) => {
    setLoading(true);
    try {
      const response = await adminService.deleteUser({
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

  return (
    <Table
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={dataSource}
      // TODO: Change pagination to true, and handle on backend also
      pagination={false}
    />
  );
}

export default CustomUsersTable;