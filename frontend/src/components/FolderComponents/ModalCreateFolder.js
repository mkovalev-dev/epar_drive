import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folderCreate, newFolderStatus } from "../../pages/slice/sliceFolder";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

export default function ModalCreateFolder({ visible, setVisible }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [errorNamedFolder, setErrorNamedFolder] = useState(false);
  const statusConfirmFolderCreate = useSelector(newFolderStatus);
  const confirmCreate = (values) => {
    dispatch(folderCreate({ name: values.name, parent_folder: id }))
      .then(unwrapResult)
      .then(() => {
        setVisible(false);
        form.resetFields();
        setErrorNamedFolder({ status: false, message: "" });
      })
      .catch((err) => {
        setErrorNamedFolder({ status: true, message: err.error[0] });
      });
  };
  return (
    <Modal
      className="modal-create-folder"
      bodyStyle={{ paddingBottom: 0 }}
      title="Укажите название папки"
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[
        <Button
          className="btn-warning-custom"
          //loading={statusConfirmFolderCreate === "loading"}
          onClick={() => {
            form.submit();
          }}
          style={{ fontWeight: "600" }}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form
        initialValues={{ name: "Новая папка" }}
        form={form}
        onFinish={confirmCreate}
      >
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
