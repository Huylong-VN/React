import React from "react";
import { Spin } from "antd";

export const SpinData = ({position}) => {
  return (
    <Spin
      tip="Loading..."
      style={{ display: "flex", justifyContent: position }}
    />
  );
};


export const PaginationCpn=()=>{
  
}
