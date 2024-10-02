import { Typography } from "antd";
import withAdmin from "../../utils/enhancers/withAdmin";

const Organizations = () => {
  return (
    <div>
      <Typography
        style={{
          color: "#fff",
        }}
      >
        Just a list of all organizations created
      </Typography>
    </div>
  );
};

const AdminOrganizations = withAdmin(Organizations);
export default AdminOrganizations;
