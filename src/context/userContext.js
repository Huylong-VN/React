import React, { useState, useEffect } from "react";
import userApi from "../api/userApi";
import { notification } from "antd";
export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [Datas, setdata] = useState([]);
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
    const response = await userApi.getAll(data);
    console.log(response);
    setdata(response.items);
    setpagination({
      pageIndex: response.pageIndex,
      pageSize: response.pageSize,
      totalRows: response.toTalRecords,
    });
    setload(true);
  };

  //Add a new
  const Add = async (data) => {
    await userApi
      .register(data)
      .then((response) => {
        console.log(response);
        openNotificationWithIcon("success", "Đăng kí thành Công");
      })
      .catch((error) => {
        console.log();
        openNotificationWithIcon("error", error.response.data);
      });
    getAll(filters);
  };

  //Update user
  const Update = async (id, row) => {
    await userApi
      .update({
        userId: localStorage.getItem("Id"),
        id: id,
        dob: row.dob,
        email: row.email,
        firstname: row.firstName,
        lastname: row.lastName,
        phone: row.phoneNumber,
      })
      .then(() => {
        openNotificationWithIcon("success", "Update Success");
        setdata(
          Datas.map((item) =>
            item.id === id
              ? {
                  ...item,
                  dob: row.dob,
                  email: row.email,
                  firstname: row.firstName,
                  lastname: row.lastName,
                  phone: row.phoneNumber,
                }
              : item
          )
        );
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.response.data);
      });
  };

  //Delete
  const Delete = async (id) => {
    await userApi
      .delete({
        userId: localStorage.getItem("Id"),
        id: id,
      })
      .then(() => {
        getAll(filters);
        // setdata(
        //  Datas.filter((data)=>data.id === id)
        //   ))
        
        openNotificationWithIcon("success", "Delete Success");
      })
      .catch((err) => {
        openNotificationWithIcon("error", err.response.data);
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
  const userContextData = {
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
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
