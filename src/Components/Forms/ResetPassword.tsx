import { App, Button, Form, Input } from "antd";
import AppTexts from "../../utils/texts/app-texts.json";
import { ErrorResponse } from "../../utils/types";
import { useEffect, useState } from "react";
import userService from "../../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>();

  const { notification } = App.useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      notification.error({
        message: "Confirm Password didn't match",
      });
      return;
    }
    setLoading(true);
    try {
      if (token) {
        const response = await userService.activate({
          data: { password: data.password },
          headers: {
            "activate-token": token,
          },
        });
        if (response) navigate("/auth/login");
      }
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      setToken(params.get("token"));
    }
  }, [location.search]);

  return (
    <Form name="activate-user-form" onFinish={onSubmit}>
      <Form.Item
        name="password"
        rules={[{ required: true, message: AppTexts.global.password_required }]}
      >
        <Input.Password
          placeholder={AppTexts.login_page.form.password_placeholder}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: AppTexts.global.confirm_password_required,
          },
        ]}
      >
        <Input.Password
          placeholder={AppTexts.activate_page.confirm_password_placeholder}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={loading} type="primary">
          {AppTexts.global.submit}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
