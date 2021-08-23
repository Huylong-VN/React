import React, { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import { Image } from "antd";

const Detail = (props) => {
  const [data, setData] = useState([]);
  const productId = props.match.params.productId;
  useEffect(() => {
    productApi.GetById(productId).then(response => {
      setData(response);
    });
  }, [productId]);
  console.log(data);
  return (
    <>
      {data.image.map((img) => (
        <Image
          preview={false}
          alt={data.description}
          className="product_image"
          src={process.env.REACT_APP_BASE_IMGS + img}
        />
      ))}
    </>
  );
};

export default Detail;
