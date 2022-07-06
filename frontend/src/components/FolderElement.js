import folder from "../resources/img/folder.png";
import excel from "../resources/img/excel.png";
import docx from "../resources/img/doc.png";
import undefined_file from "../resources/img/undefined_file.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeFolderItem,
  setActiveFolderItem,
  setActiveDrawerItem,
} from "../pages/slice/sliceBase";
import { Tooltip } from "antd";

export default function FolderElement({ title, type, id, isTrash }) {
  const stateActiveFolderItem = useSelector(activeFolderItem);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState();
  useEffect(() => {
    if (type === "folder") {
      setIcon(folder);
    } else if (type === ".xlsx") {
      setIcon(excel);
    } else if (type === ".docx") {
      setIcon(docx);
    } else {
      setIcon(undefined_file);
    }
  }, []);
  return (
    <Tooltip title={title} placement="bottom">
      <div
        className={
          stateActiveFolderItem?.id === `${type}-${id}`
            ? "block-item-files-active"
            : "block-item-files"
        }
        onClick={() => {
          if (stateActiveFolderItem?.id === `${type}-${id}`) {
            dispatch(setActiveFolderItem({}));
            dispatch(setActiveDrawerItem({ visible: false }));
          } else {
            dispatch(setActiveFolderItem({ id: `${type}-${id}` }));
            dispatch(
              setActiveDrawerItem({
                id: id,
                name: title,
                visible: true,
                type: type,
                trash: isTrash,
              })
            );
          }
        }}
      >
        <img style={{ width: "100%" }} src={icon} alt={title} />
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "500",
            wordBreak: "break-all",
          }}
        >
          {title.length > 10
            ? title.slice(0, 5) + "..." + title.slice(-5)
            : title}
        </p>
      </div>
    </Tooltip>
  );
}
