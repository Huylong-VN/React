import React from "react";
import PropTypes from "prop-types";
import { Input, Col, Row } from "antd";

const Search = (props) => {
  const { onSubmit } = props;
  const onSearch = (value) => {
    onSubmit(value);
  };
  return (
    <Row span={6} justify="end">
      <Col >
        <Input.Search
          className="search-bottom"
          onSearch={(value) => {
            onSearch(value);
          }}
          size="middle"
        />
      </Col>
    </Row>
  );
};
Search.propTypes = {
  onSubmit: PropTypes.func,
};
Search.defaultProps = {
  onSubmit: null,
};
export default Search;
