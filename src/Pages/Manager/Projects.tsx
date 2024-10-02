import withManager from "../../utils/enhancers/withManager";

const Projects = () => {
  return <div>Projects</div>;
};

const ManagerProjects = withManager(Projects);
export default ManagerProjects;
