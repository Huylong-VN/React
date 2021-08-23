import React, { useState } from "react";
import { Popconfirm, message, Button } from "antd";
import productApi from "../../../api/productApi";

export const DeleteImage = ({ id }) => {
  const [load, setload] = useState(false);
  async function confirm() {
    setload(true);
    await productApi.DeleteImage(id);
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
        <Button loading={load === true}>Delete</Button>
      </Popconfirm>
    </div>
  );
};
