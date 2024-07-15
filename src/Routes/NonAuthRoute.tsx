import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { USER_ROLES } from "../utils/constants";

interface Props {
  children: React.ReactElement;
}

const NonAuthRoute = ({ children }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.value.session.access_token)
    <Navigate
      to={
        auth?.value?.user.userRole === USER_ROLES.SUPER_ADMIN
          ? "/super-admin/organizations"
          : "/admin/projects"
      }
      replace
    />;

  return children;
};

export default NonAuthRoute;
