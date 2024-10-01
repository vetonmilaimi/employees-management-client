import { App, Button, Form, Input } from "antd";

import AppTexts from "../../utils/texts/app-texts.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import organizationService from "../../services/organization.service";
import { OrganizationSliceReducers } from "../../store/slices/organization.slice";
import { ErrorResponse, IOrganization } from "../../utils/types";
import { useForm } from "antd/es/form/Form";

interface Props {
  onSuccessCallback?: () => void;
  update?: boolean;
  organization?: IOrganization;
}

const OrganizationForm = ({
  onSuccessCallback,
  update,
  organization,
}: Props) => {
  const { notification } = App.useApp();
  const [form] = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setLoading(true);
    try {
      const response = update
        ? await organizationService.update({ data })
        : await organizationService.add({ data });

      dispatch(OrganizationSliceReducers.set(response.message));

      if (!update) navigate("/manager/organization");
      if (update && onSuccessCallback) {
        onSuccessCallback();
        notification.success({
          message: "Organization updated",
          description: "Organization updated successfully",
        });
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
    if (organization) {
      form.setFieldsValue({
        name: organization.name,
        description: organization.description || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  return (
    <Form name="add-organization-form" onFinish={onSubmit} form={form}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Organization name is required" }]}
      >
        <Input placeholder="Organization name" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: false,
            message: "Organization description is optional",
          },
        ]}
      >
        <Input placeholder="Organization Description" />
      </Form.Item>

      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" loading={loading} type="primary">
            {AppTexts.global.submit}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default OrganizationForm;
