import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AllTemplatesPage = () => {
  const [dataValue, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/template");
      setData(data.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    setIsLoader(true);
    try {
      const { data: res } = await axios.delete(`/api/v1/template/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setIsLoader(false);
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (template) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (selectedTemplate) {
      handleDelete(selectedTemplate._id);
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };
  const navigate = useNavigate();
  const handleChooseTemplate = (...template) => {
    navigate("/file-upload", { state: { template } });
  };
  return (
    <div>
      {isDialogOpen && (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this template?</p>
            <div style={buttonContainerStyle}>
              {isLoader ? (
                <div>Processing....</div>
              ) : (
                <>
                  <button onClick={handleConfirmDelete} style={yesButtonStyle}>
                    Yes
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={handleCloseDialog} style={noButtonStyle}>
                    No
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className="form"
        style={{
          display: "flex",
          maxWidth: "90vw",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "10px",
          overflowY: "scroll",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : dataValue.length > 0 ? (
          dataValue.map((item, index) => (
            <div
              key={index}
              className="form"
              onClick={() => handleChooseTemplate(item.message, item.subject)}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>{index + 1}</p>
              <div>
                <MdOutlinePhotoSizeSelectActual style={{ fontSize: "90px" }} />
                <p style={{ textAlign: "center" }}>
                  {item.name.length > 20
                    ? item.name.slice(0, 19) + ".."
                    : item.name || "Template"}
                </p>
              </div>
              <div>
                <p>{item.subject.slice(0, 30) + "..."}</p> <br />
                <p>{item.message.slice(0, 30) + "..."}</p>
              </div>
              <MdDelete
                className="delet-btn"
                onClick={() => handleOpenDialog(item)}
              />
            </div>
          ))
        ) : (
          <p>No templates available!</p>
        )}
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const yesButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const noButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AllTemplatesPage;
