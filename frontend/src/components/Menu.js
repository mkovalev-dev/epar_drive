import MenuItem from "./MenuItem";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  FolderOutlined,
  HddOutlined,
} from "@ant-design/icons";
import React from "react";

export default function Menu() {
  return (
    <>
      <MenuItem
        id="latest"
        icon={<ClockCircleOutlined />}
        name="Последние"
        linkTo="/latest"
      />
      <MenuItem id="files" icon={<FolderOutlined />} name="Файлы" linkTo="/" />
      <MenuItem
        id="archive"
        icon={<HddOutlined />}
        name="Архив"
        linkTo="/archive"
      />
      <MenuItem
        id="trash"
        icon={<DeleteOutlined />}
        name="Корзина"
        linkTo="/trash"
      />
    </>
  );
}
