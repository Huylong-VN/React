import React, { useState, useEffect } from "react";
import productApi from "../api/productApi";
import { notification } from "antd";
export const ProductContext = React.createContext();

const ProductContextProvider = ({ children }) => {
  const [Datas, setData] = useState([]);
  const [load, setload] = useState(false);

  var [pagination, setpagination] = useState({
    pageIndex: 1,
  });
  var [filters, setfilters] = useState({
    pageIndex: 1,
    pageSize: 6,
    keyword: "",
  });

  const handlePageChange = (page, pageSize) => {
    setload(false);
    setfilters({
      ...filters,
      pageIndex: page,
      pageSize: pageSize,
    });
  };
  const handleFiltersChange = (newFilters) => {
    setload(false);
    setfilters({
      ...filters,
      keyword: newFilters,
    });
  };

  //CRUD
  //GEt
  const getAll = async (data) => {
    const response = await productApi.getAll(data);
    setData(response.items);
    setpagination({
      pageIndex: response.pageIndex,
      pageSize: response.pageSize,
      totalRows: response.toTalRecords,
    });
    setload(true);
  };

  //Add a new
  const Add = async (data) => {
    await productApi
      .add(data)
      .then(() => {
        openNotificationWithIcon("success", "Create Success");
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data);
      });
    // getAll(filters);
  };

  //Update user
  const Update = async (values) => {
    await productApi
      .update(values)
      .then(() => {
        openNotificationWithIcon("success", "Update Success");
        getAll(filters);
      })
      .catch((err) => {
        openNotificationWithIcon("error", err);
      });
  };

  //Delete
  const Delete = async (id) => {
    await productApi
      .delete(id)
      .then(() => {
        openNotificationWithIcon("success", "Delete Success");
        getAll(filters);
      })
      .catch((err) => {
        openNotificationWithIcon("error", err);
      });
  };

  const openNotificationWithIcon = (type, mes) => {
    notification[type]({
      message: "Notification Title",
      description: mes,
    });
  };

  useEffect(() => {
    getAll(filters);
  }, [filters]);

  // Context data
  const productContextData = {
    openNotificationWithIcon,
    getAll,
    Update,
    Delete,
    Add,
    Datas,
    load,
    pagination,
    handlePageChange,
    handleFiltersChange,
  };

  //return provider
  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
