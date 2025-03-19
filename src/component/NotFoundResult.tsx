import { Result, Button } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

const StyledButton = styled(Button)`
  background-color: var(--blue-accent);
  color: white;
`;

function NotFoundResult() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <div>
          <p>Sorry, the page you visited does not exist.</p>
          <StyledButton onClick={() => navigate("/")}>
            Back to Homepage
          </StyledButton>
        </div>
      }
    />
  );
}

export default NotFoundResult;
