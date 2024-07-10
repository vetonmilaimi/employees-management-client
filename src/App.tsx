import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "red",
        },
      }}
    >
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
