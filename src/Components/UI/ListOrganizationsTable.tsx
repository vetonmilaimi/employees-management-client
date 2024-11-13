import { Table, TableProps } from "antd";
import { IOrganization } from "../../utils/types";

interface IListOrganizationsTableProps {
  loading: boolean;
  organizations: Array<IOrganization>;
}

const ListOrganizationsTable = ({
  loading,
  organizations,
}: IListOrganizationsTableProps) => {
  const columns: TableProps<IOrganization>["columns"] = [
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
    {
      title: "Manager",
      key: "manager",
      render: (_, record) => <span>{record?.users?.[0]?.email}</span>,
    },
  ];

  return (
    <Table
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={organizations}
      // TODO: Change pagination to true, and handle on backend also
      pagination={false}
    />
  );
};

export default ListOrganizationsTable;
