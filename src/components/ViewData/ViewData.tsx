import React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ViewData: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [columns, setColumns] = useState<Array<any>>([]);
  const [rows, setRows] = useState<Array<any>>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setColumns([
          { field: "userId", headerName: "User Id" },
          { field: "id", headerName: "Id" },
          { field: "title", headerName: "Title", width: 300 },
          { field: "body", headerName: "Body", width: 700 },
        ]);
        setRows(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewData;
