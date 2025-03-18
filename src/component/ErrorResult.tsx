import { Result } from "antd";

function ErrorResult() {
  return (
    <Result
      status="500"
      title="Oops! Something went wrong."
      subTitle={
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <p>
            We’re sorry, but something unexpected happened. <br /> Our team has
            been notified, and we’re working to fix it as soon as possible. Try
            refreshing the page or coming back later. If the issue persists,
            please contact support.
          </p>
        </div>
      }
    />
  );
}

export default ErrorResult;
