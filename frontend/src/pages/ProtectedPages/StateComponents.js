import React from "react";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import logo from "../../resources/img/logo.png";
import SiderMenu from "../../components/SiderMenu";
import DrawerFolder from "../../components/FolderComponents/DrawerFolder";

export default function StateComponents({ children }) {
  return (
    <Layout className="font-custom-block">
      <Header className="header-private-home">
        <a href="/" rel="noreferrer">
          <img src={logo} />
        </a>
      </Header>
      <Layout>
        <SiderMenu />
        <Content className="layout-content">
          <div
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              height: "100%",
              borderRadius: "5px",
              maxWidth: "100%",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <Footer className="footer">2022 © ООО ЭК ЭПАР</Footer>
      <DrawerFolder />
    </Layout>
  );
}
