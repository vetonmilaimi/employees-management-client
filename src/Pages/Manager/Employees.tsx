import withManager from "../../utils/enhancers/withManager";
import { App, Button } from "antd";

import AppTexts from "../../utils/texts/app-texts.json";
import CustomUsersTable from "../../Components/UI/CustomUsersTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ErrorResponse, IUser } from "../../utils/types";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.service";

const Employees = () => {
  const { notification } = App.useApp();

  const auth = useSelector((state: RootState) => state.auth.value);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await adminService.listUsers();
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

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <div className="max-w-100 py-3 px-1 my-2 bg-white flex justify-end rounded-md">
        <Button type="primary" onClick={() => {}}>
          {AppTexts.users_page["add-user"]}
        </Button>
      </div>
      <CustomUsersTable
        loading={loading}
        getUsers={getUsers}
        setLoading={setLoading}
        dataSource={users}
        currentRole={auth?.user?.role}
      />
    </div>
  );
};

const ManagerEmployees = withManager(Employees);
export default ManagerEmployees;
