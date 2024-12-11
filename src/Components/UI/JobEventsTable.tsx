import { Button, Space, Table, TableProps } from "antd";
import { IJobEvent } from "../../utils/types";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";

interface IJobEventsTableProps {
  loading: boolean;
  jobEvents: IJobEvent[];
}

//TODO: This should be used also to update a job event on the future
const JobEventsTable = ({ jobEvents, loading }: IJobEventsTableProps) => {
  const viewJobEvent = (jobEvent: IJobEvent) => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <div className="text-center">
            <h1>View Job Event Modal</h1>
            <h1>{jobEvent.title}</h1>
            <p>{jobEvent.description ?? ""}</p>
          </div>
        ),
      })
    );
  };

  const columns: TableProps<IJobEvent>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 3,
      render: (_, record) => (
        <p className="text-sm line-clamp-1">
          {record.description ?? (
            <span className="text-secondary opacity-50">
              Nothing to show...
            </span>
          )}
        </p>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2">
          <Space size="middle">
            <Button
              type="default"
              className="opacity-80 text-sm"
              onClick={() => viewJobEvent(record)}
            >
              View
            </Button>
          </Space>
          <Space size="middle">
            <Button
              type="default"
              className="bg-red-500 text-white text-sm"
              onClick={() => viewJobEvent(record)}
            >
              Delete
            </Button>
          </Space>
        </div>
      ),
      width: 0.5,
    },
  ];

  return (
    <Table
      bordered
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={jobEvents}
      pagination={false}
    />
  );
};

export default JobEventsTable;
