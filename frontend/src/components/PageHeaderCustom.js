import { Button, Divider, PageHeader, Select } from "antd";
import { AppstoreOutlined, OrderedListOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageHeaderCustom({ title, back, breadcrumb = <></> }) {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        backIcon={back}
        title={title}
        onBack={() => {
          if (back) {
            navigate(-1);
          } else {
            return false;
          }
        }}
        breadcrumb={breadcrumb}
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
