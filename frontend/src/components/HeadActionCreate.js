import { Button, Upload } from "antd";
import { PlusOutlined, UsbOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ModalCreateFolder from "./FolderComponents/ModalCreateFolder";

export default function HeadActionCreate() {
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        block
        className="btn-warning-custom"
        onClick={() => setVisibleModalCreate(true)}
      >
        Создать папку
      </Button>
      <div style={{ marginBottom: "15px" }} />
      <Upload className="upload-file-button">
        <Button icon={<UsbOutlined />} block className="btn-default-custom">
          Загрузить
        </Button>
      </Upload>
      {visibleModalCreate && (
        <ModalCreateFolder
          visible={visibleModalCreate}
          setVisible={setVisibleModalCreate}
        />
      )}
    </>
  );
}
