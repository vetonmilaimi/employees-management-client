import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NotFound from "../../Components/UI/NotFound";
import { USER_ROLES } from "../constants";
import { useNavigate } from "react-router-dom";

interface Props {}

export default function withManager<T extends Props>(
  ChildComponent: ComponentType<T>
) {
  return (hocProps: T) => {
    const auth = useSelector((state: RootState) => state?.auth.value);
    const organization = useSelector(
      (state: RootState) => state?.organization.value
    );

    const navigate = useNavigate();

    useEffect(() => {
      if (!organization._id) navigate("/manager/add-organization");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    if (auth?.user?.role !== USER_ROLES.MANAGER) {
      return <NotFound />;
    }

    return <ChildComponent {...hocProps} />;
  };
}
