import LoginForm from "../../Components/Forms/Login.form";
import Title from "antd/es/typography/Title";

const Login = () => {
  return (
    <div style={{ textAlign: "center", width: "40%", marginInline: "auto" }}>
      <Title
        level={2}
        style={{
          color: "#fff",
        }}
      >
        Login Page
      </Title>
      <LoginForm />
    </div>
  );
};

export default Login;
