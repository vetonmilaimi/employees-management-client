import AppTexts from "../../utils/texts/app-texts.json";
import ResetPassword from "../../Components/Forms/ResetPassword.form";

const Activate = () => {
  return (
    <div className="text-center w-[40%] mx-auto py-[5rem]">
      <h1 className="text-3xl mb-7 text-white">
        {AppTexts.activate_page.title}
      </h1>

      <ResetPassword />
    </div>
  );
};

export default Activate;
