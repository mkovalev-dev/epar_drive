import { List, Skeleton } from "antd";
import FolderElement from "./FolderElement";
import React from "react";

export default function ListItems({ listData, status, trash = false }) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 3,
        sm: 4,
        md: 5,
        lg: 6,
        xl: 9,
        xxl: 10,
      }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.id}>
          {status === "succeeded" ? (
            <FolderElement
              type={item.type}
              title={item.name}
              id={item.id}
              isTrash={trash}
            />
          ) : (
            <Skeleton />
          )}
        </List.Item>
      )}
    />
  );
}
