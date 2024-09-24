import { App, Button, Form, Input } from "antd";

import AppTexts from "../../utils/texts/app-texts.json";
import { useState } from "react";
import { ErrorResponse } from "../../utils/types";
import superAdminService from "../../services/admin.service";

interface Props {
  onSuccessCallback: () => void;
}

const AddUser = ({ onSuccessCallback }: Props) => {
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setLoading(true);
    try {
      const response = await superAdminService.inviteUser({ data });
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
    <div className="px-5 py-3 border-">
      <h1 className="text-xl mb-1 text-secondary">Add a user</h1>
      <Form name="add-user-form" onFinish={onSubmit}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: AppTexts.global.field_required }]}
        >
          <Input placeholder={AppTexts.global.first_name} />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: AppTexts.global.field_required }]}
        >
          <Input placeholder={AppTexts.global.last_name} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: AppTexts.global.field_required }]}
        >
          <Input placeholder={AppTexts.login_page.form.email_placeholder} />
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

export default AddUser;
