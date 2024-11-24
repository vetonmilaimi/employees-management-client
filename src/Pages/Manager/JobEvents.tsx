import withManager from "../../utils/enhancers/withManager";
import PageTabHeader from "../../Components/UI/PageTabHeader";
import { PageTabButtonTypes } from "../../utils/types";

const items = [
  {
    label: "List",
    onClick: () => {},
    type: PageTabButtonTypes.LINK,
  },
  {
    label: "Add new",
    onClick: () => {},
    type: PageTabButtonTypes.BUTTON,
  },
];

const JobEvents = () => {
  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <PageTabHeader title="Job Events" items={items} />
    </div>
  );
};

const ManagerJobEvents = withManager(JobEvents);
export default ManagerJobEvents;
