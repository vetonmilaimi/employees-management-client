import withManager from "../../utils/enhancers/withManager";
import PageTabHeader from "../../Components/UI/PageTabHeader";
import { IJobEvent, PageTabButtonTypes } from "../../utils/types";
import JobEventsTable from "../../Components/UI/JobEventsTable";
import { useEffect, useState } from "react";
import jobEventService from "../../services/job-event.service";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";

const JobEvents = () => {
  const [jobEvents, setJobEvents] = useState<IJobEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobEvents = async () => {
    try {
      const response = await jobEventService.list();
      setJobEvents(response.message.map((el) => ({ ...el, key: el._id })));
      console.log(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addJobEvent = () => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: <h1>Add Job Event</h1>,
      })
    );
  };

  useEffect(() => {
    loadJobEvents();
  }, []);

  const items = [
    {
      label: "Add new",
      onClick: addJobEvent,
      type: PageTabButtonTypes.BUTTON,
    },
  ];

  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <PageTabHeader title="Job Events" items={items} />
      <JobEventsTable loading={loading} jobEvents={jobEvents} />
    </div>
  );
};

const ManagerJobEvents = withManager(JobEvents);
export default ManagerJobEvents;
