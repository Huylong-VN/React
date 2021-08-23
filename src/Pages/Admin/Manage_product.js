import React from "react";
import ProductContextProvider from "../../context/productContext";
import PaginationCpn from "../../Components/Admin/Product/PaginationCP";
import Search from "../../Components/Common/Search"
import Create from "../../Components/Admin/Product/Create";
import {TableData} from "../../Components/Admin/Product/Table"

const Manage_product = () => {
  return (
    <ProductContextProvider>
      <Create />
      <Search />
      <TableData/>
      <PaginationCpn />
    </ProductContextProvider>
  );
};

export default Manage_product;
