import React, { useState, useContext } from "react";
import { Button, Table, Input, InputNumber, Form } from "antd";
import { RoleAssign } from "./RoleAssign";
import { Pagination, Row } from "antd";
import { UserContext } from "../../../context/userContext";
import Search from "../../../Components/Common/Search";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  //Context
  const contextDT = useContext(UserContext);
  const {
    load,
    Datas,
    Delete,
    Update,
    handlePageChange,
    pagination,
    handleFiltersChange,
  } = contextDT;

  const [form] = Form.useForm();
  const [editingid, setEditingid] = useState("");
  const [runUpdate, setrunUpdate] = useState(false);
  const [LoadDelete, setLoadDelete] = useState(false);
  const isEditing = (record) => record.id === editingid;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingid(record.id);
  };
  const save = async (id) => {
    setrunUpdate(true);
    try {
      const row = await form.validateFields();
      await Update(id, row);
      setEditingid("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
    setrunUpdate(false);
  };

  const remove = async (id) => {
    setLoadDelete(true);
    await Delete(id);
    setLoadDelete(false);
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      editable: false,
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      editable: true,
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "dob",
      dataIndex: "dob",
      key: "dob",
      editable: true,
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      colspan: 2,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              onClick={() => save(record.id)}
              type="primary"
              disabled={runUpdate === true}
              shape="round"
              loading={runUpdate === true}
            >
              Save
            </Button>
            <Button
              type="primary"
              danger
              shape="round"
              onClick={() => setEditingid("")}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            disabled={editingid !== ""}
            shape="round"
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "x",
      dataIndex: "operation",
      render: (_, record) => {
        <Button onClick={() => remove(record)} loading={LoadDelete===true}>
         Delete
        </Button>;
      },
    },
    {
      title: "RoleAssign",
      key: "RoleAssign",
      dataIndex: "RoleAssign",
      render: (_, record) => <RoleAssign id={record.id} />,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Search onSubmit={(keyword) => handleFiltersChange(keyword)} />
      <Form form={form} component={false}>
        <Table
          loading={load === false}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowKey={(Datas) => Datas.id}
          dataSource={Datas}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
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

export default EditableTable;
