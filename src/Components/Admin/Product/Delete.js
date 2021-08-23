import React, { useContext, useState } from "react";
import { Popconfirm, message, Button } from "antd";
import { ProductContext } from "../../../context/productContext";

export const Delete = ({ record }) => {
  //Context
  const contextDT = useContext(ProductContext);
  const [load, setload] = useState(false);

  async function confirm() {
    setload(true);
    await contextDT.Delete(record.id);
    setload(false);
  }

  function cancel() {
    message.error("Cancer Success");
  }
  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        {load === true ? "Loading" : <Button>Delete</Button>}
      </Popconfirm>
    </div>
  );
};
