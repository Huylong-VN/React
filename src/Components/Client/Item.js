import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Col, Row, Spin, Space } from "antd";

const Item = ({ loading, products }) => {
  if (loading === true) {
    return (
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} span={6} xs={12} sm={8} xxl={6}>
            <Card
              size="small"
              extra={<Link to="about">More</Link>}
              hoverable
              title={product.name}
              cover={
                <Link to={`/detail/${product.id}`}>
                  <Image
                    preview={false}
                    alt={product.name}
                    className="product_image"
                    src={process.env.REACT_APP_BASE_IMGS + product.image}
                  />
                </Link>
              }
            >
              <Card.Meta description={product.description} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <Space style={{ justifyContent: "center", display: "flex" }} size="middle">
      <Spin size="large" />
    </Space>
  );
};

export default Item;
