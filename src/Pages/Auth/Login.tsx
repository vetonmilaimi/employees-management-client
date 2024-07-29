import LoginForm from "../../Components/Forms/Login.form";
import AppTexts from "../../utils/texts/app-texts.json";

const Login = () => {
  return (
    <div className="text-center w-[40%] mx-auto py-[5rem]">
      <h1 className="text-3xl mb-7 text-white">{AppTexts.login_page.title}</h1>

      <LoginForm />
    </div>
  );
};

export default Login;
