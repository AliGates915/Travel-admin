import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';
import axios from "axios";

const Datatable = ({columns, hotelId}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  
  // Initialize list with an empty array
  const [list, setList] = useState([]);
  
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      if (path === "users" || path === "hotels") {
        await axios.delete(`/${path}/${id}`);
      } else if (path === "rooms") {
        await axios.delete(`/${path}/${id}/${hotelId}`);
      }
      
      // Update the state to remove the deleted item
      setList(list.filter((item) => item._id !== id));
      alert("Delete successful");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
       All {path}
        <Link to={`/${path}/new`} className="link">
          Add New User
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}  // Use list which is now guaranteed to be an array
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;
