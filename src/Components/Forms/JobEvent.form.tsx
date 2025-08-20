import { JOB_EVENT_STATUS } from "../../utils/constants";
import { useState } from "react";
import { App, Button, Form, Input, Popconfirm, Select, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

import { ErrorResponse, IJobEvent, IProject, IUser } from "../../utils/types";
import jobEventService from "../../services/job-event.service";
import generalHelpersService from "../../services/generalHelpersService";

interface JobEventProps {
  employees?: IUser[];
  projects?: IProject[];
  update?: boolean;
  jobEvent?: IJobEvent;
  onSuccessCallback: () => void;
}

const JobEventForm = ({
  employees,
  projects,
  onSuccessCallback,
  update,
  jobEvent,
}: JobEventProps) => {
  const [form] = useForm();
  const { notification } = App.useApp();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setLoading(true);
    const cleanedData = generalHelpersService.cleanNulls(data);
    try {
      const response = !update
        ? await jobEventService.add({ data: cleanedData })
        : await jobEventService.update({
            data: cleanedData,
            query: { _id: jobEvent?._id },
          });
      if (!response.error) onSuccessCallback();
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteJobEvent = async () => {
    try {
      const response = await jobEventService.delete({
        query: { _id: jobEvent?._id },
      });
      if (response.message) {
        onSuccessCallback();
        notification.success({
          message: "Job event deleted",
          description: "Job event deleted successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    }
  };

  return (
    <div className="px-5">
      <h1 className="text-xl mb-1 text-secondary">
        {update ? "Edit job event" : "Add a job event"}
      </h1>
      <Form
        name="add-job-event-form"
        onFinish={onSubmit}
        form={form}
        layout="horizontal"
      >
        {/* General Info Section */}
        <div className="border rounded-md p-4 mb-6 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3 text-secondary">
            General Information
          </h2>
          <div className="flex justify-center gap-4">
            <Form.Item
              name="title"
              className="w-[100%]"
              rules={[
                { required: true, message: "Please input job event title!" },
              ]}
              initialValue={update ? jobEvent?.title : undefined}
            >
              <Input placeholder="Job event title" />
            </Form.Item>
            <Form.Item
              name="status"
              className="w-1/3"
              label="Status"
              initialValue={update ? jobEvent?.status : JOB_EVENT_STATUS.TODO}
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select>
                <Select.Option value={JOB_EVENT_STATUS.TODO}>To Do</Select.Option>
                <Select.Option value={JOB_EVENT_STATUS.IN_PROGRESS}>In Progress</Select.Option>
                <Select.Option value={JOB_EVENT_STATUS.ON_REVIEW}>On Review</Select.Option>
                <Select.Option value={JOB_EVENT_STATUS.DONE}>Done</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-center gap-4">
            <Form.Item
              className="w-2/3 min-h-[100px]"
              name="description"
              rules={[{ required: false }]}
              initialValue={update ? jobEvent?.description : undefined}
            >
              <TextArea placeholder="Job event Description" rows={4} />
            </Form.Item>
            <div className="flex flex-col justify-between w-1/3">
              <Form.Item
                name="project"
                rules={[{ required: true }]}
                initialValue={
                  update
                    ? jobEvent?.project
                    : projects?.length === 1
                    ? projects[0]._id
                    : undefined
                }
              >
                <Select placeholder="Select a project">
                  {projects?.map((project) => (
                    <Select.Option key={project._id} value={project._id}>
                      {project.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="employees"
                rules={[{ required: false }]}
                initialValue={update ? jobEvent?.employees : undefined}
              >
                <Select
                  placeholder="Select employees"
                  mode="multiple"
                  allowClear
                >
                  {employees?.map((employee) => (
                    <Select.Option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Date Section - at the end of the form, before buttons */}
        <div className="border rounded-md p-4 mt-6 mb-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3 text-secondary">
            Estimated time
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-12 text-right font-medium">From</span>
              <Form.Item
                name="start"
                className="flex-1 mb-0"
                rules={[]}
                initialValue={
                  update && jobEvent?.start ? dayjs(jobEvent?.start) : undefined
                }
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  placeholder="Start date and time"
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-right font-medium">To</span>
              <Form.Item
                name="end"
                className="flex-1 mb-0"
                rules={[]}
                initialValue={
                  update && jobEvent?.end ? dayjs(jobEvent?.end) : undefined
                }
              >
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  placeholder="End date and time"
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {update && (
            <Popconfirm
              title="Are you sure to delete this job event?"
              onConfirm={() => {
                deleteJobEvent();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="default"
                className="bg-red-500 text-white"
                onClick={() => {}}
              >
                Delete
              </Button>
            </Popconfirm>
          )}

          <Form.Item>
            <Button loading={loading} htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default JobEventForm;
