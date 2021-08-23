import React from "react";
import { Pagination,Row } from "antd";
import { ProductContext } from "../../../context/productContext";

const PaginationCP = () => {
  const context = React.useContext(ProductContext);
  const { pagination, handlePageChange } = context;
  return (
    <>
     <Row justify="center">
     <Pagination
        current={pagination.pageIndex}
        defaultPageSize={6}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
        total={pagination.totalRows}
        showSizeChanger
        pageSizeOptions={[6, 10, 20, 30]}
      />
     </Row>
     
    </>
  );
};
export default PaginationCP;