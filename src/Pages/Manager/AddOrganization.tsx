import OrganizationForm from "../../Components/Forms/OrganizationForm";

const AddOrganization = () => {
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

export default AddOrganization;
