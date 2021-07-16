import React from "react";
import Download from "../../assets/images/download.png";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";

export  const exportToCSV = (csvData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
export const ExportCSV = ({ csvData, fileName }) => {
  return (
    <OverlayTrigger
      overlay={(props) => (
        <Tooltip id={`Download-Button`} {...props}>
          Click here to download
        </Tooltip>
      )}
    >
      <a style={{cursor: "pointer"}} href onClick={(e) => exportToCSV(csvData, fileName)}>
        
        <img src={Download} alt=""/>
      </a>
    </OverlayTrigger>
  );
};
