import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Typography, Button, App } from "antd";
import { IProject, IJobEvent, IUser } from "../../utils/types";
import projectService from "../../services/project.service";
import withManager from "../../utils/enhancers/withManager";
import JobEventsTable from "../../Components/UI/JobEventsTable";
import jobEventService from "../../services/job-event.service";
import organizationService from "../../services/organization.service";

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

  const loadProject = async (projectId: string) => {
    try {
      const response = await projectService.get({ query: { _id: projectId } });
      setProject(response.message);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed to load project",
        description: ((error as unknown) as { message?: string })?.message || String(error),
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
      console.error(error);
      notification.error({
        message: "Failed to load job events",
        description: ((error as unknown) as { message?: string })?.message || String(error),
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
      console.error(error);
      notification.error({
        message: "Failed to load employees",
        description: ((error as unknown) as { message?: string })?.message || String(error),
      });
    }
  };

  const loadProjects = async () => {
    try {
      const response = await projectService.list();
      setProjects(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadProject(id);
    loadJobEvents();
    loadEmployees();
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="max-w-[80%] mx-auto mt-6">
      <Button onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>

      <Card className="mb-6">
        {loadingProject ? (
          <div className="flex justify-center py-12">
            <Spin />
          </div>
        ) : project ? (
          <div>
            <Title level={3}>{project.name}</Title>
            <Paragraph>{project.description || "No description"}</Paragraph>
          </div>
        ) : (
          <Paragraph>Project not found.</Paragraph>
        )}
      </Card>

      {/* Job events related to this project */}
      <div>
        <h2 className="text-lg text-white font-semibold mb-2">Job Events</h2>
        <JobEventsTable
          loading={loadingJobEvents}
          jobEvents={jobEvents}
          loadJobEvents={loadJobEvents}
          employees={employees}
          projects={projects}
        />
      </div>
    </div>
  );
};

const ManagerSingleProject = withManager(SingleProject);
export default ManagerSingleProject;
