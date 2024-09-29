import { useEffect, useState } from "react";
import { IOrganization } from "../../utils/types";
import organizationService from "../../services/organization.service";

const Organization = () => {
  const [organization, setOrganization] = useState<IOrganization | null>(null);

  // TODO: Make a global state for organization
  const loadOrganization = async () => {
    try {
      const response = await organizationService.about();
      setOrganization(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrganization();
  }, []);

  return (
    <div className="px-5 py-3">
      <h1 className="text-xl mb-1 text-white text-center uppercase">
        {organization?.name || "Create your organization"}
      </h1>
    </div>
  );
};

export default Organization;
