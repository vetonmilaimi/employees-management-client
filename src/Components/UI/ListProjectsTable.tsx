import { Table, TableProps } from "antd";
import { IProject } from "../../utils/types";

interface IListProjectsTableProps {
  loading: boolean;
  projects: Array<IProject>;
}

const ListProjectsTable = ({ loading, projects }: IListProjectsTableProps) => {
  const columns: TableProps<IProject>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
  ];

  return (
    <Table
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={projects}
      // TODO: Change pagination to true, and handle on backend also
      pagination={false}
    />
  );
};

export default ListProjectsTable;
