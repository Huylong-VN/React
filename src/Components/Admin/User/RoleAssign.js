import React, { useState, useEffect } from "react";
import { Modal, Button, Checkbox, notification } from "antd";
import userApi from "../../../api/userApi";


export const RoleAssign = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setroles] = useState([]);
  const [load, setload] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const getRole = async (userId) => {
    setload(false);
    var response = await userApi.getRole(userId);
    setroles(response.roles);
    setload(true);
  };
  useEffect(() => {
    getRole(id);
  }, [id]);

  const save = () => {
    setload(true);
    roles.forEach((role) => {
      userApi
        .roleAssign({
          userId: id,
          userIdRole: localStorage.getItem("Id"),
          roles: [role] !== null ? [role] : null,
        })
        .then(() => {
          setIsModalVisible(false);
          notification["success"]({
            message: "Assign Role Success",
            description: "Success! You",
          });
        })
        .catch((err) => {
          return notification["error"]({
            message: err.response.data,
            description: "Sorry! You",
          });
        });
    });
    setload(false);
  };
  return (
    <div>
      <Button onClick={showModal}>Click</Button>
      <Modal
        title="RoleAssign"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={save}
      >
        {load ? (
          <>
            {roles.map((roleValue, roleKey) => (
              <div key={roleKey}>
                <Checkbox
                  onChange={(event) => {
                    let checked = event.target.checked;
                    setroles(
                      roles.map((data) => {
                        if (roleValue.id === data.id) {
                          data.selected = checked;
                        }
                        return data;
                      })
                    );
                  }}
                  checked={roleValue.selected}
                >
                  {roleValue.name}
                </Checkbox>
              </div>
            ))}
          </>
        ) : (
         "Loading..."
        )}
      </Modal>
    </div>
  );
};
