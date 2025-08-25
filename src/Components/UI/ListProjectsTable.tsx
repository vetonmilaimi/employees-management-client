import { App, Button, Table, TableProps, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { EllipsisOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { ErrorResponse, IProject } from "../../utils/types";
import AppTexts from "../../utils/texts/app-texts.json";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import ProjectsForm from "../Forms/Projects.form";
import projectService from "../../services/project.service";

interface IListProjectsTableProps {
  loading: boolean;
  loadProjects: () => void;
  projects: Array<IProject>;
}

const ListProjectsTable = ({
  loading,
  projects,
  loadProjects,
}: IListProjectsTableProps) => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const deleteProject = async (projectId: string) => {
    try {
      const response = await projectService.delete({
        query: { _id: projectId },
      });
      if (response.message) {
        notification.success({
          message: "Project deleted",
          description: "Project deleted successfully",
        });
        loadProjects();
      }
    } catch (error) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    }
  };

  const updateProject = async (project: IProject) => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <ProjectsForm
            onSuccessCallback={() => {
              store.dispatch(GlobalSliceReducers.closeModal());
              loadProjects();
            }}
            edit
            project={project}
          />
        ),
      })
    );
  };

  const columns: TableProps<IProject>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      // render name as a clickable link that navigates to the single project page
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/manager/projects/${record._id}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "",
      key: "actions",
      align: "center",
      width: 50,
      fixed: "right",
      render: (_, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <span
                className="flex items-center gap-2 text-blue-600"
                onClick={() => navigate(`/manager/projects/${record._id}`)}
              >
                <EyeOutlined style={{ color: '#1890ff' }} />
                <span>View</span>
              </span>
            ),
          },
          {
            key: "update",
            label: (
              <span
                className="flex items-center gap-2"
                onClick={() => updateProject(record)}
              >
                <EditOutlined />
                <span>Update</span>
              </span>
            ),
          },
          {
            key: "delete",
            label: (
              <span
                className="flex items-center gap-2 text-red-500"
                onClick={() => {
                  const confirmed = window.confirm(
                    AppTexts.users_page["delete-user"] || "Are you sure?"
                  );
                  if (confirmed) deleteProject(record._id);
                }}
              >
                <DeleteOutlined style={{ color: '#ff4d4f' }} />
                <span>{AppTexts.global.delete}</span>
              </span>
            ),
          },
        ];

        return (
          <div className="flex items-center justify-end gap-2 w-full">
            <Dropdown menu={{ items: menuItems }} placement="bottomRight">
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      loading={loading}
      tableLayout="fixed"
      columns={columns}
      dataSource={projects}
      // TODO: Change pagination to true, and handle on backend also
      pagination={false}
      bordered
    />
  );
};

export default ListProjectsTable;
