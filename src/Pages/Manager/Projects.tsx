import { useEffect, useState } from "react";
import projectService from "../../services/project.service";
import { IProject } from "../../utils/types";
import { Button } from "antd";
import ListProjectsTable from "../../Components/UI/ListProjectsTable";
import { store } from "../../store/store";
import { GlobalSliceReducers } from "../../store/slices/global.slice";
import withManager from "../../utils/enhancers/withManager";

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const response = await projectService.list();
      setProjects(response.message.map((el) => ({ ...el, key: el._id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = () => {
    store.dispatch(
      GlobalSliceReducers.showModal({
        component: <h1>Add Project Here</h1>,
      })
    );
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="flex-col justify-center overflow-hidden max-w-[80%] mx-auto">
      <div className="max-w-100 py-3 px-1 my-2 bg-white flex justify-end rounded-md">
        <Button type="primary" onClick={addProject}>
          Add Project
        </Button>
      </div>
      <ListProjectsTable loading={loading} projects={projects} />
    </div>
  );
};

const ManagerProjects = withManager(Projects);
export default ManagerProjects;
