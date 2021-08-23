import React, { useState, useEffect } from "react";
import { Pagination, Row } from "antd";
import productApi from "../../api/productApi"
import Slide from "../../Components/Client/Slide"
import Search from "../../Components/Common/Search"
import Item from "../../Components/Client/Item"

const Home = () => {
  const [productList, setproductList] = useState([]);

  const [pagination, setpagination] = useState({});

  const [filters, setfilters] = useState({
    pageIndex: 1,
    pageSize: 6,
    keyword: "",
  });

  const [loading, setloading] = useState(false);

  useEffect(() => {
    const featchApi = async () => {
      const response = await productApi.getAll(filters);
      setproductList(response.items);
      setpagination({
        pageIndex: response.pageIndex,
        pageSize: response.pageSize,
        totalRows: response.toTalRecords,
      });
      setloading(true);
    };
   
    featchApi();
  }, [filters,loading]);
  const handlePageChange = (page, pageSize) => {
    setloading(false);
    setfilters({
      ...filters,
      pageIndex: page,
      pageSize: pageSize,
    });
  };
  const handleFiltersChange = (newFilters) => {
    setfilters({
      ...filters,
      keyword: newFilters,
    });
  };
  return (
    <div>
      <div className="container">
        <br />
        <Slide />
        <Search onSubmit={handleFiltersChange} />
        <Item loading={loading} products={productList} />
        <Row justify="center">
          {" "}
          <Pagination
            current={pagination.pageIndex}
            defaultPageSize={6}
            onChange={(page, pageSize) => handlePageChange(page, pageSize)}
            total={pagination.totalRows}
            showSizeChanger
            pageSizeOptions={[6, 10, 20, 30]}
          />
        </Row>
      </div>
    </div>
  );
};

export default Home;
