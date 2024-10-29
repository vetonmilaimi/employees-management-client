import { ConfigProvider, App as AntDApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";
import CustomModal from "./Components/UI/Modal";
import MainHeader from "./Components/UI/MainHeader";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const authSession = useSelector((state: RootState) => state.auth.value);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#76ABAE",
        },
        components: {
          Typography: {
            colorPrimary: "#fff",
          },
        },
      }}
    >
      <AntDApp>
        <BrowserRouter>
          <Suspense fallback={<LoadingOutlined />}>
            {authSession?.session?.accessToken && (
              <MainHeader authSession={authSession} />
            )}
            <CustomModal />
            <RoutesComponent />
          </Suspense>
        </BrowserRouter>
      </AntDApp>
    </ConfigProvider>
  );
}

export default App;
