import { Avatar, Button, Form, Modal, notification, Select, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userShared, userSharedData } from "../../pages/slice/sliceUsers";
import React from "react";
import nophoto from "../../resources/img/nophoto.png";
import {
  userSharedPermission,
  userSharedPermissionDestroy,
} from "../../pages/slice/sliceBase";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ModalShareForUsers({
  visible,
  setVisible,
  type,
  id,
  title,
}) {
  const dispatch = useDispatch();
  const stateUserSharedData = useSelector(userSharedData);
  useEffect(() => {
    dispatch(userShared({ type: type, id: id }));
  }, [id, type]);

  const addUserAction = (values) => {
    dispatch(userSharedPermission(values))
      .then(unwrapResult)
      .then((res) => {
        dispatch(userShared({ type: type, id: id }));
        notification.success({
          key: "success-hard-delete",
          message: "Права успешно назначены!",
          style: {
            width: 325,
            borderRadius: "25px 25px 0 0",
            marginBottom: "7px",
            bottom: -24,
          },
          placement: "bottomLeft",
        });
      })
      .catch((err) => {
        notification.error({
          key: "success-hard-delete",
          message: `${err.error[0]}`,
          style: {
            width: 325,
            borderRadius: "25px 25px 0 0",
            marginBottom: "7px",
            bottom: -24,
          },
          placement: "bottomLeft",
        });
      });
  };
  const columns = [
    {
      title: "Аватар",
      key: "avatart",
      width: "45px",
      ellipsis: true,
      render: () => <Avatar size={35} src={nophoto} />,
    },
    {
      title: "ФИО",
      key: "name",
      width: 300,
      render: (text) => (
        <>
          {text.last_name} {text.first_name}
          <br />
          <small style={{ color: "#b7b7b7" }}>{text.groups[0].name}</small>
        </>
      ),
    },
    {
      title: "add",
      key: "add",
      ellipsis: true,
      align: "right",
      render: (render) => (
        <Form
          layout={"inline"}
          initialValues={render.shared ? render.shared : { read_only: false }}
          onFinish={(values) => {
            values["user"] = render.id;
            if (type === "folder") {
              values["folder_to"] = id;
              values["file_to"] = null;
            } else {
              values["file_to"] = id;
              values["folder_to"] = null;
            }
            addUserAction(values);
          }}
        >
          <Form.Item name="read_only">
            <Select bordered={false} disabled={render.shared}>
              <Select.Option value={false}>Полный доступ</Select.Option>
              <Select.Option value={true}>Только чтение</Select.Option>
            </Select>
          </Form.Item>
          {render.shared ? (
            <Form.Item>
              <Button
                className="btn-danger-custom"
                block
                style={{ width: "111px" }}
                onClick={() => {
                  dispatch(userSharedPermissionDestroy(render.shared.id))
                    .then(() => {
                      dispatch(userShared({ type: type, id: id }));
                      notification.success({
                        key: "success-hard-delete",
                        message: "Права успешно отозваны!",
                        style: {
                          width: 325,
                          borderRadius: "25px 25px 0 0",
                          marginBottom: "7px",
                          bottom: -24,
                        },
                        placement: "bottomLeft",
                      });
                    })
                    .catch((err) => {
                      notification.error({
                        key: "success-hard-delete",
                        message: "ОШИБКА! Права не отозваны!",
                        style: {
                          width: 325,
                          borderRadius: "25px 25px 0 0",
                          marginBottom: "7px",
                          bottom: -24,
                        },
                        placement: "bottomLeft",
                      });
                    });
                }}
              >
                Отозвать
              </Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <Button
                block
                htmlType="submit"
                className="btn-warning-custom"
                style={{ width: "111px" }}
              >
                Пригласить
              </Button>
            </Form.Item>
          )}
        </Form>
      ),
    },
  ];
  return (
    <Modal
      className="modal-create-folder"
      bodyStyle={{ padding: 0 }}
      width={700}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      title={title}
      footer={[]}
    >
      <Table
        className="user-shared-table"
        scroll={{
          y: 240,
        }}
        size="small"
        pagination={false}
        showHeader={false}
        columns={columns}
        dataSource={stateUserSharedData ? stateUserSharedData : []}
      />
    </Modal>
  );
}
