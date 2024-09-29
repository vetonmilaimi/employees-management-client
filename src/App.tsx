import { ConfigProvider, App as AntDApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Routes/Routes";
import CustomModal from "./Components/UI/Modal";
import MainHeader from "./Components/UI/MainHeader";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";

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
          {authSession?.session?.accessToken && (
            <MainHeader authSession={authSession} />
          )}
          <CustomModal />
          <RoutesComponent />
        </BrowserRouter>
      </AntDApp>
    </ConfigProvider>
  );
}

export default App;
