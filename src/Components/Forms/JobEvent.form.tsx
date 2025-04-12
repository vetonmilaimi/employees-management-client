import { App, Button, Form, Input, Popconfirm, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { ErrorResponse, IJobEvent, IProject, IUser } from "../../utils/types";
import { useState } from "react";
import jobEventService from "../../services/job-event.service";

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
    try {
      const response = !update
        ? await jobEventService.add({ data })
        : await jobEventService.update({ data, query: { _id: jobEvent?._id } });
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
              initialValue={update ? jobEvent?.project : projects?.length === 1 ? projects[0]._id : undefined}
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
              <Select placeholder="Select employees" mode="multiple" allowClear>
                {employees?.map((employee) => (
                  <Select.Option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
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
