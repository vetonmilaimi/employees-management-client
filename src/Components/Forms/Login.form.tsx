import { App, Button, Form, Input } from "antd";
import AppTexts from "../../utils/texts/app-texts.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import userService from "../../services/user.service";
import { USER_ROLES } from "../../utils/constants";
import { useState } from "react";
import { ErrorResponse } from "../../utils/types";
import organizationService from "../../services/organization.service";
import { OrganizationSliceReducers } from "../../store/slices/organization.slice";

const LoginForm = () => {
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    setLoading(true);
    try {
      const response = await userService.login({ data });
      dispatch(AuthSliceReducers.login(response.message));

      if (response?.message?.user?.role === USER_ROLES.ADMIN) {
        navigate("/admin/users");
      }

      if (response?.message?.user?.role === USER_ROLES.MANAGER) {
        const organizationResponse = await organizationService.about();
        if (organizationResponse.message) {
          dispatch(OrganizationSliceReducers.set(organizationResponse.message));
          navigate("/manager/projects");
        } else {
          navigate("/manager/add-organization");
        }
      }
    } catch (error: unknown) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form name="login-form" onFinish={onSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: AppTexts.global.email_required }]}
        >
          <Input placeholder={AppTexts.login_page.form.email_placeholder} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: AppTexts.global.password_required },
          ]}
        >
          <Input.Password
            placeholder={AppTexts.login_page.form.password_placeholder}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={loading} type="primary">
            {AppTexts.login_page.form.login}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
