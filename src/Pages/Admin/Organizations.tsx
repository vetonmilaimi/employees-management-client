import { App } from "antd";
import ListOrganizationsTable from "../../Components/UI/ListOrganizationsTable";
import withAdmin from "../../utils/enhancers/withAdmin";
import { ErrorResponse, IOrganization } from "../../utils/types";
import adminService from "../../services/admin.service";
import { useEffect, useState } from "react";

const Organizations = () => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [loading, setLoading] = useState(true);

  const { notification } = App.useApp();

  const getOrganizations = async () => {
    try {
      const response = await adminService.listOrganizations();
      console.log(response.message);
      setOrganizations(
        response.message.map((el) => {
          return { ...el, key: el._id };
        })
      );
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
    getOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-col py-3 justify-center overflow-hidden max-w-[80%] mx-auto">
      <ListOrganizationsTable loading={loading} organizations={organizations} />
    </div>
  );
};

const AdminOrganizations = withAdmin(Organizations);
export default AdminOrganizations;
