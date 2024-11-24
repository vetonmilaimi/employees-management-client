import { Button } from "antd";
import { PageTabItems, PageTabButtonTypes } from "../../utils/types";

interface IPageTabHeaderProps {
  title: string;
  items: PageTabItems[];
}

const PageTabHeader = ({ title, items }: IPageTabHeaderProps) => {
  return (
    <div className="max-w-100 my-5 py-3 px-3 my-2 bg-white flex justify-between items-center rounded-md">
      <h1 className="text-l">{title}</h1>
      <div className="max-w-90 flex justify-end gap-2 items-center">
        {items.map((item) => {
          if (item.type === PageTabButtonTypes.LINK) {
            return (
              <Button type="link" onClick={item.onClick}>
                {item.label}
              </Button>
            );
          } else {
            return (
              <Button type="primary" onClick={item.onClick}>
                {item.label}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default PageTabHeader;
