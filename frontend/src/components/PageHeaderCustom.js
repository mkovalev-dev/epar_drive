import { Button, Divider, PageHeader, Select } from "antd";
import { AppstoreOutlined, OrderedListOutlined } from "@ant-design/icons";
import React from "react";

export default function PageHeaderCustom({ title, backIcon }) {
  return (
    <>
      <PageHeader
        backIcon={backIcon}
        title={title}
        extra={[
          <Select
            defaultValue="name"
            style={{ width: 200 }}
            suffixIcon={<OrderedListOutlined />}
          >
            <Select.Option value="name">По названию</Select.Option>
          </Select>,
          <Button key="2" icon={<AppstoreOutlined />}></Button>,
        ]}
      />
      <Divider />
    </>
  );
}
