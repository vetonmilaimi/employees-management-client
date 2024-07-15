import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#76ABAE",
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
