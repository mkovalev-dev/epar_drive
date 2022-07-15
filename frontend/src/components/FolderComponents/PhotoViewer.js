import { Image } from "antd";

export default function PhotoViewer({ src, visible, setVisible }) {
  return (
    <Image
      width={200}
      style={{ display: "none" }}
      src={src}
      preview={{
        visible,
        src: src,
        onVisibleChange: (value) => {
          setVisible(value);
        },
      }}
    />
  );
}
