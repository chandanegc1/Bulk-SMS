import React from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

const ChooseProject = () => {

  return (
    <div>
      <div className="form" style={style}>
        <FaPlus style={{ fontSize: "90px" }} />
        <h3>Create Template</h3>
      </div>
      <div className="form" style={style}>
        <MdOutlinePhotoSizeSelectActual style={{ fontSize: "90px" }} />
        <h3>Choose Template</h3>
      </div>
    </div>
  );
};

export default ChooseProject;


const style = {
  display: "flex",
  cursor: "pointer",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};
