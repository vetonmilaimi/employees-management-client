import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
  const auth = useSelector((state: RootState) => state?.auth);

  if (!auth?.value?.session?.accessToken)
    return <Navigate to="/auth/login" replace />;

  return children;
};

export default PrivateRoute;
