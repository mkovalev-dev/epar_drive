import { Button, Upload } from "antd";
import { PlusOutlined, UsbOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ModalCreateFolder from "./FolderComponents/ModalCreateFolder";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUploadFileChanger } from "../pages/slice/sliceFile";
import { useParams } from "react-router-dom";

export default function HeadActionCreate() {
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
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
      <Upload
        className="upload-file-button"
        showUploadList={false}
        action={id ? `/api/file/upload/${id}/` : "/api/file/upload/"}
        multiple
        accept=".xls,.xlsx,.doc,.docx, .png,.jpg"
        headers={{ "X-CSRFTOKEN": Cookies.get("csrftoken") }}
        method="POST"
        onChange={(v) => {
          dispatch(setUploadFileChanger(v.file));
        }}
      >
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
