import React from "react";
import loader from "./../images/loader.svg";

const Userhint = ({ loading, hintText }) => (
  <div className="user-hint">
    {loading ? (
      <img src={loader} alt="null" className="block mx-auto" />
    ) : (
      hintText
    )}
  </div>
);

export default Userhint;
