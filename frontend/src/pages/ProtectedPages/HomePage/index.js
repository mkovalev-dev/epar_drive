import {
  Button,
  Divider,
  Layout,
  List,
  PageHeader,
  Select,
  Skeleton,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import logo from "../../../resources/img/logo.png";
import React, { useEffect } from "react";
import SiderMenu from "../../../components/SiderMenu";
import { AppstoreOutlined, OrderedListOutlined } from "@ant-design/icons";
import FolderElement from "../../../components/FolderElement";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFolderData,
  folderList,
  listFolderData,
  listFolderStatus,
  newFolderData,
} from "../../slice/sliceFolder";
import DrawerFolder from "../../../components/FolderComponents/DrawerFolder";

export default function ProtectedHomePage() {
  const stateNewFolder = useSelector(newFolderData);
  const dispatch = useDispatch();
  const stateFolderListData = useSelector(listFolderData);
  const stateFolderListStatus = useSelector(listFolderStatus);
  const stateFolderDelete = useSelector(deleteFolderData);
  useEffect(() => {
    dispatch(folderList());
  }, [stateNewFolder, stateFolderDelete]);

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
            <PageHeader
              backIcon={false}
              title="Файлы"
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
              dataSource={[...stateFolderListData]}
              renderItem={(item) => (
                <List.Item>
                  {stateFolderListStatus === "succeeded" ? (
                    <FolderElement
                      type={item.type}
                      title={item.name}
                      id={item.id}
                    />
                  ) : (
                    <Skeleton />
                  )}
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
      <Footer className="footer">2022 © ООО ЭК ЭПАР</Footer>
      <DrawerFolder />
    </Layout>
  );
}
