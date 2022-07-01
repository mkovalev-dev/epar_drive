import { Button, Col, Drawer, Dropdown, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  activeDrawerItem,
  setActiveDrawerItem,
  setActiveFolderItem,
} from "../../pages/slice/sliceBase";
import {
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  RetweetOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  deleteFolderStatus,
  folderDelete,
} from "../../pages/slice/sliceFolder";

import { useState } from "react";
import ModalRenameItem from "./ModalRenameItem";

export default function DrawerFolder() {
  const dispatch = useDispatch();
  const stateActiveDrawerItem = useSelector(activeDrawerItem);
  const stateFolderDeleteStatus = useSelector(deleteFolderStatus);
  const [visibleModalRename, setVisibleModalRename] = useState(false);
  return (
    <Drawer
      bodyStyle={{
        backgroundColor: "rgba(24,24,24,0.9)",
        borderRadius: "0 0 30px 30px",
        padding: "10px 25px 10px 25px",
        color: "white",
      }}
      className="drawer-folder-menu"
      maskStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
      placement="top"
      closable={false}
      visible={stateActiveDrawerItem?.visible}
      onClose={() => {
        dispatch(setActiveFolderItem({}));
        dispatch(setActiveDrawerItem({ visible: false }));
      }}
      height={64}
      mask={true}
    >
      <Row className="gr-center-items">
        <Col span={1}>
          <div style={{ marginTop: "6px", width: "100%" }}>
            <ExclamationCircleOutlined
              style={{
                color: "white",
                margin: 0,
                fontSize: "18px",
              }}
            />
          </div>
        </Col>
        <Col span={5}>
          <div style={{ marginTop: "4px", width: "100%" }}>
            <span style={{ color: "white", margin: 0, fontSize: "18px" }}>
              {stateActiveDrawerItem?.name}
            </span>
          </div>
        </Col>

        <Col span={12}>
          <div style={{ marginTop: "4px", width: "100%" }}>
            <Space>
              <Button
                className="btn-default-custom"
                icon={<ShareAltOutlined />}
                disabled
              >
                Поделиться
              </Button>
              <Button
                className="btn-default-custom"
                icon={<UploadOutlined />}
                disabled
              >
                Скачать
              </Button>
              <Button
                type="text"
                icon={<EditOutlined />}
                className="btn-text-custom"
                onClick={() => setVisibleModalRename(true)}
              >
                Переименовать
              </Button>
              <Button
                type="text"
                icon={<RetweetOutlined />}
                className="btn-text-custom"
                disabled
              >
                Переместить
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="btn-text-custom"
                // loading={stateFolderDeleteStatus === "loading"}
                onClick={() => {
                  dispatch(folderDelete(stateActiveDrawerItem.id));
                  dispatch(setActiveFolderItem({}));
                  dispatch(setActiveDrawerItem({ visible: false }));
                }}
              >
                Удалить
              </Button>
              <Button
                type="text"
                icon={<CopyOutlined />}
                className="btn-text-custom"
                disabled
              >
                Копировать
              </Button>
              <Button
                type="text"
                icon={<EllipsisOutlined rotate={90} />}
                className="btn-text-custom"
                disabled
              ></Button>
              <Button
                onClick={() => {
                  dispatch(setActiveFolderItem({}));
                  dispatch(setActiveDrawerItem({ visible: false }));
                }}
                type="text"
                icon={<CloseOutlined />}
                className="btn-text-custom"
              ></Button>
            </Space>
          </div>
        </Col>
      </Row>
      {visibleModalRename && (
        <ModalRenameItem
          folder_id={stateActiveDrawerItem.id}
          type={stateActiveDrawerItem.type}
          name={stateActiveDrawerItem.name}
          visible={visibleModalRename}
          setVisible={setVisibleModalRename}
        />
      )}
    </Drawer>
  );
}
