import { App, Button, Popconfirm, Space, Table, TableProps } from "antd";
import { JOB_EVENT_STATUS } from "../../utils/constants";
import { CheckCircleTwoTone, ClockCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { ErrorResponse, IJobEvent, IProject, IUser, MODAL_SIZES } from "../../utils/types";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import JobEventForm from "../Forms/JobEvent.form";
import jobEventService from "../../services/job-event.service";

interface IJobEventsTableProps {
  loading: boolean;
  jobEvents: IJobEvent[];
  loadJobEvents: () => void;
  employees: IUser[];
  projects: IProject[];
}

const JobEventsTable = ({
  jobEvents,
  loading,
  loadJobEvents,
  employees,
  projects,
}: IJobEventsTableProps) => {
  const { notification } = App.useApp();

  const viewJobEvent = (jobEvent: IJobEvent) => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <JobEventForm
            jobEvent={jobEvent}
            employees={employees}
            onSuccessCallback={() => {
              loadJobEvents();
              store.dispatch(GlobalSliceReducers.closeModal());
            }}
            projects={projects}
            update={true}
          />
        ),
        size: MODAL_SIZES.LARGE,
      })
    );
  };

  const deleteJobEvent = async (jobEventId: string) => {
    try {
      const response = await jobEventService.delete({
        query: { _id: jobEventId },
      });
      if (response.message) {
        notification.success({
          message: "Job event deleted",
          description: "Job event deleted successfully",
        });
        loadJobEvents();
      }
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    }
  }

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 1,
      render: (_, record) => (
        <span className="capitalize text-xs font-semibold">
          {record.status || <span className="text-secondary opacity-50">-</span>}
        </span>
      ),
    },
    {
      title: "End Time",
      dataIndex: "end",
      key: "end",
      width: 1,
      render: (_, record) => {
        const now = new Date();
        const end = record.end ? new Date(record.end) : null;
        let bg = "";
        let icon = null;
        const textColor = "text-xs";

        if (!end) {
          icon = <ClockCircleTwoTone twoToneColor="#d1d5db" className="mr-1" />;
          return <span className="text-secondary opacity-50 flex items-center">-</span>;
        }

        if (record.status === JOB_EVENT_STATUS.DONE) {
          bg = "bg-green-100/70";
          icon = <CheckCircleTwoTone twoToneColor="#52c41a" className="mr-1" />;
        } else if (end < now) {
          bg = "bg-red-100/70";
          icon = <CloseCircleTwoTone twoToneColor="#ff4d4f" className="mr-1" />;
        } else if (end && (record.status === JOB_EVENT_STATUS.ON_REVIEW || record.status === JOB_EVENT_STATUS.IN_PROGRESS)) {
          bg = "bg-yellow-100/70";
          icon = <ExclamationCircleTwoTone twoToneColor="#faad14" className="mr-1" />;
        } else {
          icon = <ClockCircleTwoTone twoToneColor="#1890ff" className="mr-1" />;
        }

        return (
          <span className={`flex items-center rounded px-2 py-1 ${bg} ${textColor}`}>
            {icon}
            {end.toLocaleString()}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
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
            <Popconfirm
              title="Are you sure to delete this job event?"
              onConfirm={() => {
                deleteJobEvent(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="default"
                className="bg-red-500 text-white text-sm"
                onClick={() => {}}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
      width: 1,
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
