import { useNavigate } from "react-router";
import { Button } from "antd";

export default function DetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="primary" ghost onClick={() => navigate(-1)}>
        {"< Back"}
      </Button>
    </div>
  );
}
