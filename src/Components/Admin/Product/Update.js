import React, { useState, useContext } from "react";
import { Button, Modal, Form, Input } from "antd";
import { ProductContext } from "../../../context/productContext";

export const Update = ({ record }) => {
  //Context
  const contextDT = useContext(ProductContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [load, setload] = useState(false);
  const onFinish = (values) => {
    setload(true);
    const formData = new FormData();
    const file = document.getElementById("image").files[0];
    formData.append("image", file, file.name);
    formData.append("name", values.Name);
    formData.append("price", values.Price);
    formData.append("description", values.Description);
    formData.append("productId",record.id);
    contextDT.Update(formData);
    setload(false);
  };
  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>Update</Button>
      <Modal
        title="Create new Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="ProductName"
            name="Name"
            initialValue={record.name}
            rules={[{ required: true, message: "Please input ProductName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="Price"
            initialValue={record.price}
            rules={[{ required: true, message: "Please input Price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="Description"
            initialValue={record.description}
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Upload Image"
            initialValue={record.image}
          >
            <Input type="file" id="image" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={load===true} type="primary" htmlType="submit">
            Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
