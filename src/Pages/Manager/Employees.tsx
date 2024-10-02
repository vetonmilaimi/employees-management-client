import withManager from "../../utils/enhancers/withManager";

const Employees = () => {
  return <div>Employees</div>;
};

const ManagerEmployees = withManager(Employees);
export default ManagerEmployees;
