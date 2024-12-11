import withManager from "../../utils/enhancers/withManager";
import { App } from "antd";
import CustomUsersTable from "../../Components/UI/CustomUsersTable";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store/store";
import { ErrorResponse, IUser, PageTabItems } from "../../utils/types";
import { useEffect, useState } from "react";
import organizationService from "../../services/organization.service";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import AddUser from "../../Components/Forms/AddUser.form";
import PageTabHeader from "../../Components/UI/PageTabHeader";

const Employees = () => {
  const { notification } = App.useApp();

  const auth = useSelector((state: RootState) => state.auth.value);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await organizationService.listEmployees();
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

  const addEmployee = () => {
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

  const tabHeaderItems: PageTabItems[] = [
    {
      label: "Add new",
      onClick: addEmployee,
    },
  ];

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <PageTabHeader title="Employees" items={tabHeaderItems} />
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
