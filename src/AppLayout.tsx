import { Outlet } from "react-router";
import { Layout } from "antd";
import { styled } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";

import ErrorResult from "./component/ErrorResult";

const { Header, Content, Footer } = Layout;

const StyledContent = styled(Content)`
  background-color: var(--blue-light-cyan);
  padding: 3em 5em;

  @media (max-width: 480px) {
    padding: 1.5em;
  }
`;

const StyledHeader = styled(Header)`
  height: 7.5em;
  background-color: var(--blue-accent);
  display: flex;
  align-items: center;
  gap: 1em;

  @media (max-width: 480px) {
    padding: 0 25px;
  }
`;

const HeaderText = styled.div`
  color: white;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const HeaderLogoWrapper = styled.div`
  display: flex;
  gap: 1em;
  cursor: pointer;
`;

function AppLayout() {
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <StyledHeader>
        <HeaderLogoWrapper onClick={() => navigate("/")}>
          <HeaderText>TMDB</HeaderText>
        </HeaderLogoWrapper>
      </StyledHeader>
      <StyledContent>
        <ErrorBoundary fallback={<ErrorResult />}>
          <Outlet />
        </ErrorBoundary>
      </StyledContent>
      <Footer style={{ textAlign: "center" }}>Pancoran@2025</Footer>
    </Layout>
  );
}

export default AppLayout;
