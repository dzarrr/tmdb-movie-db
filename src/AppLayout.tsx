import { Outlet } from "react-router";
import { Layout } from "antd";
import { ErrorBoundary } from "react-error-boundary";

import ErrorResult from "./component/ErrorResult";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Content style={{ padding: "24px 48px" }}>
        <ErrorBoundary fallback={<ErrorResult />}>
          <Outlet />
        </ErrorBoundary>
      </Content>
      <Footer style={{ textAlign: "center" }}>@2025</Footer>
    </Layout>
  );
}

export default AppLayout;
