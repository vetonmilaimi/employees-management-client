import { Form, Input } from "antd";
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
      <Form name="add-job-event-form" onFinish={onSubmit} form={form}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input job event name!" }]}
        >
          <Input placeholder="Job event name" />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: false }]}>
          <TextArea placeholder="Job event Description" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddJobEvent;
