import { Button, ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "red",
        },
      }}
    >
      <Button type="primary">Click</Button>
    </ConfigProvider>
  );
}

export default App;
