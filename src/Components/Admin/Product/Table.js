import React from "react";
import { ProductContext } from "../../../context/productContext";
import { Table, TimePicker, Menu, Dropdown, Button } from "antd";
import moment from "moment";
import { CategoryAssign } from "./CategoryAssign";
import { Update } from "./Update";
import { Delete } from "./Delete";
import { ListImage } from "./ListImage";
import { Detail } from "./Detail";

export const TableData = () => {
  const context = React.useContext(ProductContext);
  const { Datas, load } = context;
  const columns = [
    {
      title: "ProductName",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "dateCreated",
      dataIndex: "dateCreated",
      render: (value) => (
        <TimePicker
          defaultValue={moment(value, "HH:mm:ss")}
          allowClear={false}
          inputReadOnly={true}
          open={false}
        />
      ),
    },
    {
      title: "DefaultImage",
      dataIndex: "image",
      key: "image",
      render: (src) => (
        <img
          src={process.env.REACT_APP_BASE_IMGS + src}
          style={{ height: 80, width: 80 }}
          alt="none"
          onClick={() => console.log("ok")}
        />
      ),
    },
    {
      title: "Action",
      render: (record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={1}>
              <CategoryAssign record={record} />
              </Menu.Item>
              <Menu.Item key={2}>
                <Update record={record} />
              </Menu.Item>
              <Menu.Item key={3}>
              <Delete record={record} />
              </Menu.Item>
              <Menu.Item key={4}>
              <ListImage record={record} />
              </Menu.Item>
              <Menu.Item key={5}>
              <Detail record={record} />
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            Action
          </Button>
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table
        loading={load === false}
        rowKey={(key) => key.id}
        bordered={true}
        pagination={false}
        dataSource={Datas}
        columns={columns}
        mobileBreakPoint={768}
      />
    </div>
  );
};
