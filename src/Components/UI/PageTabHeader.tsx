import { Button } from "antd";
import { PageTabItems, PageTabButtonTypes } from "../../utils/types";

interface IPageTabHeaderProps {
  title: string | JSX.Element;
  items: PageTabItems[];
}

const PageTabHeader = ({ title, items }: IPageTabHeaderProps) => {
  return (
    <div className="max-w-100 py-3 px-3 my-2 bg-white flex justify-between items-center rounded-md">
      <h1 className="text-l text-background">{title}</h1>
      <div className="max-w-90 flex justify-end gap-2 items-center">
        {items.map((item, key) => {
          if (item.type === PageTabButtonTypes.LINK) {
            return (
              <Button key={key} type="link" onClick={item.onClick}>
                {item.label}
              </Button>
            );
          } else if (item.type === PageTabButtonTypes.BUTTON) {
            return (
              <Button key={key} type="primary" onClick={item.onClick}>
                {item.label}
              </Button>
            );
          } else {
            return (
              <Button
                key={key}
                type="default"
                className="bg-red-500 text-white text-sm"
                onClick={item.onClick}
              >
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
