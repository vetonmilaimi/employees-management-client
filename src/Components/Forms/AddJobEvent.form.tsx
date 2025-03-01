import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

const AddJobEvent = () => {
  const [form] = useForm();

  const onSubmit = async (data: object) => {
    console.log(data);
  };
  return (
    <div className="px-5">
      <h1 className="text-xl mb-1 text-secondary">Add a job event</h1>
      <Form
        name="add-job-event-form"
        onFinish={onSubmit}
        form={form}
        layout="horizontal"
      >
        <div className="flex justify-center gap-4">
          <Form.Item
            name="name"
            className="w-[100%]"
            vertical
            rules={[
              { required: true, message: "Please input job event title!" },
            ]}
          >
            <Input placeholder="Job event title" />
          </Form.Item>
        </div>
        <div className="flex justify-center gap-4">
          <Form.Item
            className="w-2/3"
            name="description"
            rules={[{ required: false }]}
          >
            <TextArea placeholder="Job event Description" rows={4} />
          </Form.Item>
          <Form.Item className="w-1/3">
            <Select placeholder="Select a project">
              <Select.Option value="1">Project 1</Select.Option>
              <Select.Option value="2">Project 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-end">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddJobEvent;
