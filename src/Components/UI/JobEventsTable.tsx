import { Table, TableProps } from "antd";
import { IJobEvent } from "../../utils/types";

interface IJobEventsTableProps {
  loading: boolean;
  jobEvents: IJobEvent[];
}

const JobEventsTable = ({ jobEvents, loading }: IJobEventsTableProps) => {
  const columns: TableProps<IJobEvent>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  return (
    <Table
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={jobEvents}
      pagination={false}
    />
  );
};

export default JobEventsTable;
