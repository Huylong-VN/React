
import { useState,useEffect } from "react";
import {Row,Col} from "antd"

const Menu = () => {
  const [log, setlog] = useState("");
  const [token] = useState(localStorage.getItem("token"))
  const check=()=>{
    if(log==="LogOut"){
      localStorage.removeItem("token")
      localStorage.removeItem("role")
    }
  }
  useEffect(() => {
    if (
      token=== null ||
      token === undefined 
    ) {
      setlog("LogIn");
    } else {
      setlog("LogOut");
    }
  }, [token])
  return (
    <Row gutter={[16,16]}>
      <Col>Logo</Col>
      
    </Row>
  );
};

export default Menu;
