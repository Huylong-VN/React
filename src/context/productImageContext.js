import React, { useState, useEffect } from "react";
import productApi from "../api/productApi";
import { notification } from "antd";
export const ProductImageContext = React.createContext();

const ProductImageProvider = ({ children }) => {
  const [listImage, setlistImage] = useState([]);
  const [load, setload] = useState(false);
  const [id,setid]=useState()
  const getListImage = async (id) => {
    setload(true);
    const response = await productApi.ListImage(id);
    setlistImage(response);
    setload(false);
  };

  useEffect(() => {
    getListImage(record.id);
  }, [record.id]);

  const productImageContextData = {};
  return (
    <ProductImageContext.Provider value={productImageContextData}>
      {children}
    </ProductImageContext.Provider>
  );
};

export default ProductImageProvider;
