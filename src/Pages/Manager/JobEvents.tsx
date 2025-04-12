import { App } from "antd";
import { useEffect, useState } from "react";

import PageTabHeader from "../../Components/UI/PageTabHeader";
import JobEventsTable from "../../Components/UI/JobEventsTable";
import JobEventForm from "../../Components/Forms/JobEvent.form";

import organizationService from "../../services/organization.service";
import jobEventService from "../../services/job-event.service";
import withManager from "../../utils/enhancers/withManager";
import {
  ErrorResponse,
  IJobEvent,
  IProject,
  IUser,
  MODAL_SIZES,
  PageTabButtonTypes,
} from "../../utils/types";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import projectService from "../../services/project.service";

const JobEvents = () => {
  const { notification } = App.useApp();

  const [jobEvents, setJobEvents] = useState<IJobEvent[]>([]);
  const [employees, setEmployees] = useState<IUser[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobEvents = async () => {
    try {
      const response = await jobEventService.list();
      setJobEvents(response.message.map((el) => ({ ...el, key: el._id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await organizationService.listEmployees();
      setEmployees(response.message);
    } catch (error: unknown) {
      notification.error({
        message: (error as ErrorResponse).name,
        description: (error as ErrorResponse).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await projectService.list();
      setProjects(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addJobEvent = () => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: (
          <JobEventForm
            onSuccessCallback={() => {
              loadJobEvents()
              store.dispatch(GlobalSliceReducers.closeModal());
            }}
            employees={employees}
            projects={projects}
          />
        ),
        size: MODAL_SIZES.LARGE,
      })
    );
  };

  useEffect(() => {
    loadJobEvents();
    loadProjects();
    loadEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      id: "add-job-event",
      label: "Add new",
      onClick: addJobEvent,
      type: PageTabButtonTypes.BUTTON,
    },
  ];

  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <PageTabHeader title="Job Events" items={items} />
      <JobEventsTable loading={loading} jobEvents={jobEvents} loadJobEvents={loadJobEvents} projects={projects} employees={employees} />
    </div>
  );
};

const ManagerJobEvents = withManager(JobEvents);
export default ManagerJobEvents;
