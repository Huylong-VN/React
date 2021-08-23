import React from "react";
import { WalletOutlined, HomeOutlined, UserOutlined,ExportOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

export const MenuAdmin = () => {
  const toggleAuth  = ()=>{
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
  };
  return (
    <Menu theme="light" defaultSelectedKeys={1} mode="inline">
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<WalletOutlined />}>
        <Link to="/admin/product">Manage_product</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/admin/user">Manage_users</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<ExportOutlined />}>
        <Link to="/login" onClick={toggleAuth}>LogOut</Link>
      </Menu.Item>
    </Menu>
  );
};
