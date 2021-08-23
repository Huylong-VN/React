// import React,{ useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
// import PropTypes from 'prop-types'

function About(props) {
  const history = useHistory();
  return (
    <div>
        About còn cập nhật. đợi nhá !!!
      <button onClick={() => history.push("/Home")}>Home</button>
    </div>
  );
}

// About.propTypes = {

// }

export default About;
