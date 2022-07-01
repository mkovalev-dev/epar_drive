import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ProfileBlockInfo from "./ProfileBlockInfo";
import { Divider } from "antd";
import HeadActionCreate from "./HeadActionCreate";
import Menu from "./Menu";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useState } from "react";

export default function SiderMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      width={350}
      style={{
        backgroundColor: "rgba(239, 242, 245, 1)",
        marginTop: "35px",
        padding: "50px 0px 25px 25px",
      }}
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
      collapsed={collapsed}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      zeroWidthTriggerStyle={{
        color: "rgb(255,255,255)",
        borderRadius: "5px",
        marginTop: "35vh",
        backgroundColor: "rgba(5,39,68,0.83)",
      }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          height: "100%",
          borderRadius: "5px",
        }}
      >
        <ProfileBlockInfo />
        <Divider />
        <HeadActionCreate />
        <Divider />
        <Menu />
      </div>
    </Sider>
  );
}
