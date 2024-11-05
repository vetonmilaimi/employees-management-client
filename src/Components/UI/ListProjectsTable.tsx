import { App, Button, Popconfirm, Space, Table, TableProps } from "antd";

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
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Space size="middle">
            <Button
              type="default"
              className="opacity-80 text-sm"
              onClick={() => updateProject(record)}
            >
              Update
            </Button>
          </Space>
          <Space size="middle">
            <Popconfirm
              title={AppTexts.users_page["delete-user"]}
              onConfirm={() => {
                deleteProject(record._id);
              }}
              onCancel={() => {}}
              okText={AppTexts.global.yes}
              cancelText={AppTexts.global.no}
            >
              <Button
                // TODO: Change font size of all buttons at tables
                className="bg-red-500 text-white text-sm"
                type="default"
                onClick={() => {}}
              >
                {AppTexts.global.delete}
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
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
    />
  );
};

export default ListProjectsTable;
