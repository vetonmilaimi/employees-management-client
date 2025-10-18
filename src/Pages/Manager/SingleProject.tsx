import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Typography, App } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import PageTabHeader from "../../Components/UI/PageTabHeader";
import ProjectsForm from "../../Components/Forms/Projects.form";
import JobEventsTable from "../../Components/UI/JobEventsTable";
import JobEventForm from "../../Components/Forms/JobEvent.form";

import projectService from "../../services/project.service";
import jobEventService from "../../services/job-event.service";
import organizationService from "../../services/organization.service";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import { store } from "../../store/store";
import AppTexts from "../../utils/texts/app-texts.json";
import withManager from "../../utils/enhancers/withManager";
import {
  IProject,
  IJobEvent,
  IUser,
  PageTabButtonTypes,
  MODAL_SIZES,
  ErrorResponse,
  ITimeOnProject,
} from "../../utils/types";

const { Title, Paragraph } = Typography;

const SingleProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const [project, setProject] = useState<IProject | null>(null);
  const [loadingProject, setLoadingProject] = useState<boolean>(true);

  const [jobEvents, setJobEvents] = useState<IJobEvent[]>([]);
  const [loadingJobEvents, setLoadingJobEvents] = useState<boolean>(true);

  const [employees, setEmployees] = useState<IUser[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

  const [timeOnProject, setTimeOnProject] = useState<ITimeOnProject | null>(
    null
  );
  const [loadingTimeOnProject, setLoadingTimeOnProject] =
    useState<boolean>(true);

  const loadProject = async (projectId: string) => {
    try {
      const response = await projectService.get({ query: { _id: projectId } });
      setProject(response.message);
    } catch (error) {
      notification.error({
        message: "Failed to load project",
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoadingProject(false);
    }
  };

  const loadJobEvents = async () => {
    if (!id) return;
    setLoadingJobEvents(true);
    try {
      const response = await jobEventService.list({ query: { project: id } });
      setJobEvents(response.message.map((el) => ({ ...el, key: el._id })));
    } catch (error) {
      notification.error({
        message: "Failed to load job events",
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoadingJobEvents(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await organizationService.listEmployees();
      setEmployees(response.message);
    } catch (error) {
      notification.error({
        message: "Failed to load employees",
        description: (error as ErrorResponse).message,
      });
    }
  };

  const loadProjects = async () => {
    try {
      const response = await projectService.list();
      setProjects(response.message);
    } catch (error) {
      notification.error({
        message: "Failed to load projects",
        description: (error as ErrorResponse).message,
      });
    }
  };

  const loadTimeOnProject = async (projectId: string) => {
    try {
      const response = await jobEventService.getTimeWorkOnProject({
        query: { _id: projectId },
      });
      setTimeOnProject(response.message);
    } catch (error) {
      notification.error({
        message: "Failed to load time on project",
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoadingTimeOnProject(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadProject(id);
    loadJobEvents();
    loadEmployees();
    loadProjects();
    loadTimeOnProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateProject = () => {
    if (!project) return;
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <ProjectsForm
            edit
            project={project}
            onSuccessCallback={() => {
              store.dispatch(GlobalSliceReducers.closeModal());
              loadProject(project._id);
              loadTimeOnProject(id!);
            }}
          />
        ),
      })
    );
  };

  const deleteCurrentProject = async () => {
    if (!project) return;
    try {
      const response = await projectService.delete({
        query: { _id: project._id },
      });
      if (response.message) {
        notification.success({
          message: "Project deleted",
          description: "Project deleted successfully",
        });
        navigate(-1);
      }
    } catch (error) {
      notification.error({
        message: (error as unknown as { name?: string })?.name || "Error",
        description:
          (error as unknown as { message?: string })?.message || String(error),
      });
    }
  };

  return (
    <div className="max-w-[80%] mx-auto mt-6">
      <PageTabHeader
        title={
          <div className="flex items-center gap-3">
            <ArrowLeftOutlined
              className="cursor-pointer text-xl"
              onClick={() => navigate(-1)}
            />
          </div>
        }
        items={[
          {
            label: "Update",
            onClick: updateProject,
            type: PageTabButtonTypes.LINK,
          },
          // TODO: This should be a Popconfirm from antD library
          {
            label: "Delete",
            onClick: () => {
              const confirmed = window.confirm(
                AppTexts?.users_page?.["delete-user"] || "Are you sure?"
              );
              if (confirmed) deleteCurrentProject();
            },
            type: PageTabButtonTypes.DANGER,
          },
        ]}
      />

      <Card className="mb-6">
        {loadingProject ? (
          <div className="flex justify-center py-12">
            <Spin />
          </div>
        ) : project ? (
          <div>
            <Title level={3}>{project.name}</Title>
            <Paragraph>{project.description || "No description"}</Paragraph>
            {!loadingTimeOnProject && (
              <Paragraph>
                <span>
                  <span role="img" aria-label="clock">
                    ⏰
                  </span>{" "}
                  <b>
                    {timeOnProject?.hours}h {timeOnProject?.minutes}m
                  </b>{" "}
                  have been dedicated to this project so far.
                  <br />
                </span>
              </Paragraph>
            )}
          </div>
        ) : (
          <Paragraph>Project not found.</Paragraph>
        )}
      </Card>

      <div>
        <PageTabHeader
          title="Job Events"
          items={[
            {
              label: "Add new",
              type: PageTabButtonTypes.BUTTON,
              onClick: () => {
                store.dispatch(
                  GlobalSliceReducers.showModal({
                    component: (
                      <JobEventForm
                        employees={employees}
                        projects={projects}
                        onSuccessCallback={() => {
                          store.dispatch(GlobalSliceReducers.closeModal());
                          loadJobEvents();
                          loadTimeOnProject(id!);
                        }}
                        projectId={id}
                      />
                    ),
                    size: MODAL_SIZES.LARGE,
                  })
                );
              },
            },
          ]}
        />
        <JobEventsTable
          loading={loadingJobEvents}
          jobEvents={jobEvents}
          loadJobEvents={loadJobEvents}
          employees={employees}
          projects={projects}
          showProjectColumn={false}
        />
      </div>
    </div>
  );
};

const ManagerSingleProject = withManager(SingleProject);
export default ManagerSingleProject;
