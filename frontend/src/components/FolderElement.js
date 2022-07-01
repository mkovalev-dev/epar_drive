import folder from "../resources/img/folder.png";
import excel from "../resources/img/excel.png";
import undefined_file from "../resources/img/undefined_file.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeFolderItem,
  setActiveFolderItem,
  setActiveDrawerItem,
} from "../pages/slice/sliceBase";

export default function FolderElement({ title, type, id }) {
  const stateActiveFolderItem = useSelector(activeFolderItem);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState();
  useEffect(() => {
    if (type === "folder") {
      setIcon(folder);
    } else if (type === ".xlsx") {
      setIcon(excel);
    } else {
      setIcon(undefined_file);
    }
  }, []);
  return (
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
            })
          );
        }
      }}
    >
      <img style={{ width: "100%" }} src={icon} alt={title} />
      <p style={{ width: "100%", textAlign: "center", fontWeight: "500" }}>
        {title}
      </p>
    </div>
  );
}
