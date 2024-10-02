import { useEffect } from "react";
import OrganizationForm from "../../Components/Forms/OrganizationForm";
import withManager from "../../utils/enhancers/withManager";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddOrganization = () => {
  const organization = useSelector(
    (state: RootState) => state.organization.value
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (organization._id) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  return (
    <div className="p-4 w-[50%] mx-auto text-center">
      <h1 className="text-xl text-white">Create your organization</h1>

      <p className="text-white mb-4">
        Fill the form below to create your organization
      </p>
      <OrganizationForm />
    </div>
  );
};

const ManagerAddOrganization = withManager(AddOrganization);
export default ManagerAddOrganization;
