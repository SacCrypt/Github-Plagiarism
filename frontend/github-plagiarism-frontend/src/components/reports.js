import React from "react";
import { useLocation } from "react-router-dom";

function Reports() {
  const location = useLocation();
  const { state } = location;
  return <div>{state}</div>;
}

export default Reports;
