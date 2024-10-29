import { useEffect } from "react";
import organizationService from "../../services/organization.service";
import OrganizationForm from "../../Components/Forms/OrganizationForm";
import { useDispatch } from "react-redux";
import { OrganizationSliceReducers } from "../../store/slices/organization.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import withManager from "../../utils/enhancers/withManager";

const Organization = () => {
  const dispatch = useDispatch();
  const organization = useSelector(
    (state: RootState) => state.organization.value
  );

  const loadOrganization = async () => {
    try {
      const response = await organizationService.about();
      dispatch(OrganizationSliceReducers.set(response.message));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 w-[50%] mx-auto text-center">
      <h1 className="text-xl mb-1 text-white text-center uppercase">
        Update your organization
      </h1>
      <OrganizationForm
        update={true}
        onSuccessCallback={loadOrganization}
        organization={organization}
      />
    </div>
  );
};

const ManagerOrganization = withManager(Organization);
export default ManagerOrganization;
