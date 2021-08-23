import React, { useState, useContext } from "react";
import { Modal, Button, Form, Input } from "antd";
import { ProductContext } from "../../../context/productContext";

const Create = () => {
  //Context
  const contextDT = useContext(ProductContext);
  const onFinish = async (values) => {
    setload(true);
    const formData = new FormData();
    const file = document.getElementById("image").files[0];
    formData.append("image", file, file.name);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    await contextDT.Add(formData);
    setload(false);
  };
  const [load, setload] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <div>
      <Button type="primary" onClick={()=>setIsModalVisible(true)}>
        Add New Product
      </Button>
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              { required: true, message: "Please input your ProductName!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input Price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="file" id="image" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={load===true} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Create;
