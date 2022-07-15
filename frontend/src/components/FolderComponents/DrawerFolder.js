import { Button, Col, Drawer, Dropdown, notification, Row, Space } from "antd";
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
  UndoOutlined,
  FireOutlined,
} from "@ant-design/icons";
import {
  deleteFolderStatus,
  folderDelete,
  folderHardDelete,
  trashFolderList,
} from "../../pages/slice/sliceFolder";

import { useState, useEffect } from "react";
import ModalRenameItem from "./ModalRenameItem";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  drawerRetrieveFile,
  drawerRetrieveFileData,
  fileDelete,
  fileHardDelete,
  trashFileList,
} from "../../pages/slice/sliceFile";

export default function DrawerFolder() {
  const dispatch = useDispatch();
  const stateActiveDrawerItem = useSelector(activeDrawerItem);
  const stateDrawerFileData = useSelector(drawerRetrieveFileData);
  // const stateFolderDeleteStatus = useSelector(deleteFolderStatus);
  const [visibleModalRename, setVisibleModalRename] = useState(false);
  useEffect(() => {
    if (stateActiveDrawerItem.type === "folder") {
    } else {
      dispatch(drawerRetrieveFile(stateActiveDrawerItem.id));
    }
  }, [stateActiveDrawerItem]);

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
              {stateActiveDrawerItem?.name?.slice(0, 15) + "..."}
            </span>
          </div>
        </Col>

        <Col span={12}>
          <div style={{ marginTop: "4px", width: "100%" }}>
            <Space>
              {stateActiveDrawerItem?.trash ? (
                <>
                  <Button
                    className="btn-default-custom"
                    icon={<UndoOutlined />}
                    disabled
                  >
                    Восстановить
                  </Button>
                  <Button
                    className="btn-danger-custom"
                    icon={<FireOutlined />}
                    onClick={() => {
                      if (stateActiveDrawerItem.type === "folder") {
                        dispatch(
                          folderHardDelete(stateActiveDrawerItem.id)
                        ).then(() => {
                          dispatch(trashFolderList());
                        });
                      } else {
                        dispatch(fileHardDelete(stateActiveDrawerItem.id)).then(
                          () => {
                            dispatch(trashFileList());
                          }
                        );
                      }
                      dispatch(setActiveFolderItem({}));
                      dispatch(setActiveDrawerItem({ visible: false }));
                    }}
                  >
                    Удалить навсегда
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="btn-default-custom"
                    icon={<ShareAltOutlined />}
                    disabled
                  >
                    Поделиться
                  </Button>
                  {stateActiveDrawerItem.type === "folder" ? (
                    <Button
                      className="btn-default-custom"
                      icon={<UploadOutlined />}
                      disabled
                    >
                      Скачать
                    </Button>
                  ) : (
                    <Button
                      className="btn-default-custom"
                      icon={<UploadOutlined />}
                      href={stateDrawerFileData?.url}
                      target="_blank"
                    >
                      Скачать
                    </Button>
                  )}
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
                      if (stateActiveDrawerItem.type === "folder") {
                        dispatch(folderDelete(stateActiveDrawerItem.id))
                          .then(unwrapResult)
                          .then((res) => {
                            notification.open({
                              key: "hard-delete",
                              message: `Папка перемещена в корзину!`,
                              description: (
                                <Button
                                  type="link"
                                  onClick={() => {
                                    dispatch(folderHardDelete(res.id)).then(
                                      () => {
                                        notification.close("hard-delete");
                                        notification.success({
                                          key: "success-hard-delete",
                                          message: "Папка удалена навсегда!",
                                          style: {
                                            width: 325,
                                            borderRadius: "25px 25px 0 0",
                                            marginBottom: "7px",
                                            bottom: -24,
                                          },
                                          placement: "bottomLeft",
                                        });
                                      }
                                    );
                                  }}
                                >
                                  Удалить навсегда
                                </Button>
                              ),
                              style: {
                                width: 325,
                                borderRadius: "25px 25px 0 0",
                                marginBottom: "7px",
                                bottom: -24,
                              },
                              placement: "bottomLeft",
                            });
                          });
                      } else {
                        dispatch(fileDelete(stateActiveDrawerItem.id))
                          .then(unwrapResult)
                          .then((res) => {
                            notification.open({
                              key: "hard-delete",
                              message: `Файл перемещен в корзину!`,
                              description: (
                                <Button
                                  type="link"
                                  onClick={() => {
                                    dispatch(fileHardDelete(res.id)).then(
                                      () => {
                                        notification.close("hard-delete");
                                        notification.success({
                                          key: "success-hard-delete",
                                          message: "Файл удален навсегда!",
                                          style: {
                                            width: 325,
                                            borderRadius: "25px 25px 0 0",
                                            marginBottom: "7px",
                                            bottom: -24,
                                          },
                                          placement: "bottomLeft",
                                        });
                                      }
                                    );
                                  }}
                                >
                                  Удалить навсегда
                                </Button>
                              ),
                              style: {
                                width: 325,
                                borderRadius: "25px 25px 0 0",
                                marginBottom: "7px",
                                bottom: -24,
                              },
                              placement: "bottomLeft",
                            });
                          });
                      }
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
                </>
              )}
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
