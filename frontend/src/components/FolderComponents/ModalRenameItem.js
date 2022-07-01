import { Button, Form, Input, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { folderRename } from "../../pages/slice/sliceFolder";
import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  setActiveDrawerItem,
  setActiveFolderItem,
} from "../../pages/slice/sliceBase";

export default function ModalRenameItem({
  visible,
  setVisible,
  type,
  folder_id,
  name,
}) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errorNamedFolder, setErrorNamedFolder] = useState(false);
  const confirmRename = (value) => {
    if (type === "folder") {
      dispatch(
        folderRename({
          id: folder_id,
          data: { name: value.name, parent_folder: id },
        })
      )
        .then(unwrapResult)
        .then(() => {
          setVisible(false);
          form.resetFields();
          setErrorNamedFolder({ status: false, message: "" });
          dispatch(setActiveFolderItem({}));
          dispatch(setActiveDrawerItem({ visible: false }));
        })
        .catch((err) => {
          setErrorNamedFolder({ status: true, message: err.error[0] });
        });
    }
  };
  return (
    <Modal
      className="modal-create-folder"
      bodyStyle={{ paddingBottom: 0 }}
      title="Переименовать"
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[
        <Button
          className="btn-warning-custom"
          // loading={statusConfirmFolderCreate === "loading"}
          onClick={() => {
            form.submit();
          }}
          style={{ fontWeight: "600" }}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form initialValues={{ name: name }} form={form} onFinish={confirmRename}>
        <Form.Item
          name="name"
          help={errorNamedFolder.message}
          validateStatus={errorNamedFolder.status && "error"}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
