import AppTexts from "../../utils/texts/app-texts.json";

import { App, Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { ErrorResponse, IProject } from "../../utils/types";
import projectService from "../../services/project.service";

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
