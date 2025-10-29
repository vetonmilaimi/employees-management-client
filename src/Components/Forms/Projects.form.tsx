import AppTexts from "../../utils/texts/app-texts.json";

import { App, Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { ErrorResponse, IProject } from "../../utils/types";
import projectService from "../../services/project.service";
import { JOB_EVENT_STATUS } from "../../utils/constants";
import { CheckCircleFilled, ClockCircleFilled, SyncOutlined, EyeOutlined } from "@ant-design/icons";

interface Props {
  edit?: boolean;
  project?: IProject;
  onSuccessCallback: () => void;
}

const ProjectsForm = ({ onSuccessCallback, edit, project }: Props) => {
  const [form] = useForm();
  const { notification } = App.useApp();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setLoading(true);
    try {
      const response = edit
        ? await projectService.update({ data, query: { _id: project?._id } })
        : await projectService.add({ data });
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

  return (
    <div className="px-5">
      <h1 className="text-xl mb-1 text-secondary">
        {edit ? "Edit project" : "Add a project"}
      </h1>

      <Form name="add-project-form" onFinish={onSubmit} form={form}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input project name!" }]}
          initialValue={edit ? project?.name : ""}
        >
          <Input placeholder="Project name" />
        </Form.Item>

        <Form.Item
          name="status"
          rules={[{ required: false }]}
          initialValue={edit ? project?.status : JOB_EVENT_STATUS.TODO}
        >
          <Select optionLabelProp="label">
            <Select.Option value={JOB_EVENT_STATUS.TODO} label={<span><ClockCircleFilled style={{ color: '#faad14', marginRight: 6 }} />To Do</span>}>
              <span><ClockCircleFilled style={{ color: '#faad14', marginRight: 6 }} />To Do</span>
            </Select.Option>
            <Select.Option value={JOB_EVENT_STATUS.IN_PROGRESS} label={<span><SyncOutlined spin style={{ color: '#1890ff', marginRight: 6 }} />In Progress</span>}>
              <span><SyncOutlined spin style={{ color: '#1890ff', marginRight: 6 }} />In Progress</span>
            </Select.Option>
            <Select.Option value={JOB_EVENT_STATUS.ON_REVIEW} label={<span><EyeOutlined style={{ color: '#722ed1', marginRight: 6 }} />On Review</span>}>
              <span><EyeOutlined style={{ color: '#722ed1', marginRight: 6 }} />On Review</span>
            </Select.Option>
            <Select.Option value={JOB_EVENT_STATUS.DONE} label={<span><CheckCircleFilled style={{ color: '#52c41a', marginRight: 6 }} />Done</span>}>
              <span><CheckCircleFilled style={{ color: '#52c41a', marginRight: 6 }} />Done</span>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: false }]}
          initialValue={edit ? project?.description : ""}
        >
          <TextArea
            placeholder="Project Description"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary">
              {AppTexts.global.submit}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ProjectsForm;
