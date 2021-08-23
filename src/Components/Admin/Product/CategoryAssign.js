import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, notification } from "antd";
import productApi from "../../../api/productApi";

export const CategoryAssign = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setcategories] = useState([]);
  const getCategories = async (id) => {
    const results = await productApi.GetCategoryAssign(id);
    setcategories(results.categories);
  };
  useEffect(() => {
    getCategories(record.id);
  }, [record.id]);

  const save = () => {
    categories.forEach(async (category) => {
      await productApi.CategoryAssign({
        Id: record.id,
        Categories: [category],
      });
    });
    notification["success"]({
      message: "Update Success",
      description: "Success! You",
    });
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>Category</Button>
      <Modal
        title="Create new Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={save}
      >
        {categories.map((category, key) => (
          <div key={key}>
            <Checkbox
              onChange={(event) => {
                let checked = event.target.checked;
                category.selected = checked;
              }}
              Checked={category.checked}
            >
              {category.name}
            </Checkbox>
          </div>
        ))}
      </Modal>
    </div>
  );
};
