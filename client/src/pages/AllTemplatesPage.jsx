import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AllTemplatesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data function
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

  // Handle delete function
  const handleDelete = async (id) => {
    try {
      const { data: res } = await axios.delete(`/api/v1/template/${id}`);
      alert(res.msg);
      // Filter out deleted item instantly
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Error deleting data.");
    }
  };

  return (
    <div>
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
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="form"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <MdOutlinePhotoSizeSelectActual style={{ fontSize: "90px" }} />
                <h4>{item.name || "Template"}</h4>
              </div>
              <div>
                <p>{item.subject.slice(0, 30) + "..."}</p> <br />
                <p>{item.message.slice(0, 30) + "..."}</p>
              </div>
              <MdDelete
                className="delet-btn"
                onClick={() => {
                  handleDelete(item._id);
                }}
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

export default AllTemplatesPage;
