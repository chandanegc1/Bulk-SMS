import React, { use } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div>
      <div className="form" style={style} onClick={()=> navigate("/create-template")}>
        <FaPlus style={{ fontSize: "90px" }} />
        <h3>Create Template</h3>
      </div>
      <div className="form" style={style} onClick={(()=>navigate("/all-template", { state: { data } }))}>
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
