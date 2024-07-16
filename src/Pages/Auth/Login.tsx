import { Button, Form, Input } from "antd";

import AppTexts from "../../utils/texts/app-texts.json";
import { useState } from "react";
import userService from "../../services/user.service";
import { useDispatch } from "react-redux";
import { AuthSliceReducers } from "../../store/slices/auth.slice";
import { USER_ROLES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    setLoading(true);
    try {
      const response = await userService.login({ data });
      dispatch(AuthSliceReducers.login(response.message));
      if (response.message?.user?.role === USER_ROLES.SUPER_ADMIN) {
        navigate("/super-admin/organizations");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", width: "40%", marginInline: "auto" }}>
      <h1>Login Page</h1>

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
    </div>
  );
};

export default Login;
