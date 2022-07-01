import { useDispatch } from "react-redux";
import { Button } from "antd";
import { folderHardDelete } from "../pages/slice/sliceFolder";

export default function NotificationButtonHardDelete({ id }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="link"
      onClick={() => {
        dispatch(folderHardDelete(id));
      }}
    >
      Удалить навсегда
    </Button>
  );
}
