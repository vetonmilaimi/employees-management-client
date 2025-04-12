import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NotFound from "../../Components/UI/NotFound";
import { USER_ROLES } from "../constants";

interface Props {}

export default function withUser<T extends Props>(
  ChildComponent: ComponentType<T>
) {
  return (hocProps: T) => {
    const auth = useSelector((state: RootState) => state?.auth.value);

    if (auth?.user?.role !== USER_ROLES.USER) {
      return <NotFound />;
    }

    return <ChildComponent {...hocProps} />;
  };
}
