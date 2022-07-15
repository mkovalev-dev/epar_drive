import folder from "../resources/img/folder.png";
import excel from "../resources/img/excel.png";
import docx from "../resources/img/doc.png";
import png from "../resources/img/png.png";
import jpg from "../resources/img/jpg.png";
import undefined_file from "../resources/img/undefined_file.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeFolderItem,
  setActiveFolderItem,
  setActiveDrawerItem,
} from "../pages/slice/sliceBase";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import PhotoViewer from "./FolderComponents/PhotoViewer";

export default function FolderElement({ title, type, id, isTrash, src }) {
  const stateActiveFolderItem = useSelector(activeFolderItem);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState();
  const navigate = useNavigate();
  const [visibleImgViewer, setVisibleImgViewer] = useState(false);
  useEffect(() => {
    switch (type) {
      case "folder":
        return setIcon(folder);
      case ".xlsx":
        return setIcon(excel);
      case ".docx":
        return setIcon(docx);
      case ".png":
        return setIcon(png);
      case ".jpeg":
        return setIcon(jpg);
      default:
        return setIcon(undefined_file);
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
        onContextMenu={() => {
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
        onClick={() => {
          if (type === "folder") {
            navigate(`/folder/${id}`);
          } else if (type === ".png" || type === ".jpeg") {
            setVisibleImgViewer(true);
          } else if (type === ".xlsx") {
            navigate(`/xlsx/viewer/${id}`);
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
      {visibleImgViewer && (
        <PhotoViewer
          src={src}
          visible={visibleImgViewer}
          setVisible={setVisibleImgViewer}
        />
      )}
    </Tooltip>
  );
}
