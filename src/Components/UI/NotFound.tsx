import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="m-auto text-center text-white py-4">
      <h1 className="text-xl mb-1">Couldn't find this page</h1>
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
