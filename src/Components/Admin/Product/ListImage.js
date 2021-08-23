import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Image, Popconfirm, message } from "antd";
import productApi from "../../../api/productApi";

export const ListImage = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listImage, setlistImage] = useState([]);
  const [load, setload] = useState(false);
  const getListImage = async (id) => {
    setload(true);
    const response = await productApi.ListImage(id);
    setlistImage(response);
    setload(false);
  };
  useEffect(() => {
    getListImage(record.id);
  }, [record.id, isModalVisible]);

  async function confirm(id) {
    await productApi.DeleteImage(id);
    getListImage(record.id);
  }

  function cancel() {
    message.error("Cancer Success");
  }
  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>ListImage</Button>
      <Modal
        title="ListImage"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {load === false ? (
          <>
            <Row gutter={[24, 24]}>
              {listImage.map((image) => (
                <React.Fragment key={image.id}>
                  {image.isDefault ? (
                    ""
                  ) : (
                    <>
                      <Col span={12}>
                        <Image
                          src={
                            process.env.REACT_APP_BASE_IMGS + image.imagePath
                          }
                          style={{ height: 100 }}
                          alt={image.caption}
                        />
                        <>
                          <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirm(image.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button loading={load === true}>Delete</Button>
                          </Popconfirm>
                        </>
                      </Col>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Row>
          </>
        ) : (
          "Loading"
        )}
      </Modal>
    </div>
  );
};
