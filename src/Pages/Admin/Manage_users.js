import React from "react";
import Create from "../../Components/Admin/User/Create";

import UD from "../../Components/Admin/User/UD";
import UserContextProvider from "../../context/userContext";

const Manage_users = () => {
  return (
    <>    
      <UserContextProvider>
      <Create />
        <UD />
      </UserContextProvider>
    </>
  );
};

export default Manage_users;
