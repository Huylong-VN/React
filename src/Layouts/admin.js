import { Layout, Breadcrumb, PageHeader, Button, Drawer, Affix } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import "./admin.css";
import { useState } from "react";
import { MenuAdmin } from "../Components/Admin/Menu";
const { Header, Content, Footer } = Layout;
const Layout_admin = (props) => {
  const [visible, setvisible] = useState();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="site-drawer-render-in-current-wrapper">
        <Affix offsetTop="0">
          <Button type="light" onClick={() => setvisible(true)}>
            <MenuFoldOutlined />
          </Button>
        </Affix>
        <Drawer
          title="Hiu Hiu, Welcome"
          placement="right"
          closable={false}
          onClose={() => setvisible(false)}
          visible={visible}
        >
          <h2>Menu</h2>
          <MenuAdmin />
        </Drawer>
      </div>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Welcome"
            subTitle="Xin Lỗi. Layout của admin đang đượcc nhật nên sẽ sử dụng tạm layout của client"
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HuyK3 Design ©2021 Created by HuyK3
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Layout_admin;
