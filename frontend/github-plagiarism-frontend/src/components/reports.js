import { Check } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../App";

function CheckDiv() {
  return (
    <Box
      sx={{ marginTop: "3em", padding: "2em" }}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Typography sx={{ marginBottom: ".25em" }} variant="h5">
        Details
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        {" "}
        AST Analysis
        <Check sx={{ fontSize: "20px" }} color="success" />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {" "}
        Directory Analysis
        <Check sx={{ fontSize: "20px" }} color="success" />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        {" "}
        File Analysis
        <Check sx={{ fontSize: "20px" }} color="success" />
      </Box>
    </Box>
  );
}

function PlagirizeHigh({ projectName, percentage, repository }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Typography variant="h4">
        Significant Plagiarism found in project.
      </Typography>
      <Typography>
        We found {percentage}% plagiarised content in the project.
      </Typography>
      <Typography>
        Suspected repository from content was plagiarised --&gt;
        <a href={repository}>{projectName.slice(0, -4)} </a>
      </Typography>

      <CheckDiv />
    </Box>
  );
}

function PlagiarizeLow() {
  return (
    <Box>
      After conducting a thorough analysis of the project content, it has been
      determined that no or very less instances of plagiarism were found. The
      content on the project seems to be original and does not appear to be
      copied or improperly sourced from other sources.
      <h3>Details :</h3>
      <CheckDiv />
    </Box>
  );
}

function Reports() {
  const setColor = useContext(Context);

  const [data, setData] = useState({});
  const { percentage, projectName, repository } = data;
  if (percentage >= 50) {
    setColor("red");
  }
  const location = useLocation();

  if (percentage >= 50) {
    console.log(setColor);
    //setColor("red");
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id_param = searchParams.get("id");
    fetch(`/get_reports/${id_param}`).then((data) =>
      data.json().then((data) => setData(data))
    );
    // eslint-disable-next-line
  }, []);
  console.log(data);
  return percentage >= 50 ? (
    <PlagirizeHigh
      projectName={projectName}
      percentage={percentage}
      repository={repository}
    />
  ) : (
    <PlagiarizeLow />
  );
}

export default Reports;
