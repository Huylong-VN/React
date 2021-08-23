import "./client.css";
import React, { useState } from "react";
import { Layout, PageHeader, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  ExportOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const Client = (props) => {
  const { Header, Content, Footer } = Layout;
  var authenticate = localStorage.getItem("token") ? true : false;

  const [isAuthenticated, setisAuthenticated] = useState(authenticate);
  const toggleAuth = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    setisAuthenticated(false);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <div className="logo" />
        <Menu theme="light" mode="horizontal">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/about">About Us</Link>
          </Menu.Item>
          {isAuthenticated !== true ? (
            <Menu.Item key="3" icon={<LoginOutlined />}>
              <Link to="/login" onClick={toggleAuth}>
                Login
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="3" icon={<ExportOutlined />}>
              <Link to="/home" onClick={toggleAuth}>
                LogOut
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Title"
            subTitle="This is a subtitle"
          />
        </Header>
        <Content className="site-layout" style={{ padding: "0 50px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
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

export default Client;
