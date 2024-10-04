import { App, Button } from "antd";
import { ErrorResponse, IUser } from "../../utils/types";
import { useEffect, useState } from "react";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import { RootState, store } from "../../store/store";
import AddUser from "../../Components/Forms/AddUser.form";
import adminService from "../../services/admin.service";
import AppTexts from "../../utils/texts/app-texts.json";
import withAdmin from "../../utils/enhancers/withAdmin";
import CustomUsersTable from "../../Components/UI/CustomUsersTable";
import { useSelector } from "react-redux";

const Users = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const { notification } = App.useApp();

  const addUser = () => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <AddUser
            currentRole={auth?.user?.role}
            onSuccessCallback={() => {
              store.dispatch(GlobalSliceReducers.closeModal());
              getUsers();
            }}
          />
        ),
      })
    );
  };

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
        <Button type="primary" onClick={addUser}>
          {AppTexts.users_page["add-user"]}
        </Button>
      </div>
      <CustomUsersTable
        loading={loading}
        getUsers={getUsers}
        setLoading={setLoading}
        dataSource={users}
        currentRole={auth.user?.role}
      />
    </div>
  );
};

const AdminUsers = withAdmin(Users);
export default AdminUsers;
