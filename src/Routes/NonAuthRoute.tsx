import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";

interface Props {
  children: React.ReactElement;
}

const NonAuthRoute = ({ children }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth?.value?.session?.accessToken) {
    return (
      <Navigate
        to={
          auth?.value?.user?.role === USER_ROLES.ADMIN
            ? "/admin/organizations"
            : "/manager/projects"
        }
        replace
      />
    );
  }

  return children;
};

export default NonAuthRoute;
