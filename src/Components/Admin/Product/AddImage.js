import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import productApi from "../../../api/productApi";

export const AddImage = ({ productId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [load, setload] = useState(false);

  const onFinish = async (values) => {
    setload(true);
    const formData = new FormData();
    const file = document.getElementById("image").files[0];
    formData.append("image", file, file.name);
    formData.append("Caption", values.Caption);
    formData.append("productId", productId);
    formData.append("SortOrder", values.SortOrder);
    await productApi.AddImage(formData);
    setIsModalVisible(false)
    setload(false);
  };
  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "2%" }}
      >
        Add Image
      </Button>
      <Modal
        title="Create new Image"
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
            label="Caption"
            name="Caption"
            rules={[{ required: true, message: "Please input Caption!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sort Order"
            name="SortOrder"
            rules={[{ required: true, message: "Please input SortOrder!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="file" id="image" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={load === true} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
