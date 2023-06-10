import {
  Box,
  Chip,
  Stack,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Check } from "@mui/icons-material";
import { json, useNavigate } from "react-router-dom";

function FileUpload() {
  const [tip, setTip] = useState("Uploading Files");
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitFile = (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    }).then((data) => {
      data.json().then((data) => {
        const json_data = data;
        navigate("/reports", { state: json_data });
      });
      setData([data]);
      setTip("Project Analysis Complete...");
    });
    let iteration = 0;
    const id = setInterval(() => {
      setTip(tips[iteration]);
      if (iteration == tips.length) {
        setTip("Almost Done...");
        clearInterval(id);
      }
      iteration += 1;
    }, 3000);
  };

  const tips = [
    "Processing Files",
    "Analyzing Content",
    "Detecting Plagiarism",
    "Generating Reports",
  ];

  const handleFileChange = (e) => {
    if (dragOver) {
      setDragOver(false);
    }
    if (e) {
      const event_file = e.target.files[0];
      submitFile(event_file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  return (
    <Box
      onDragOver={handleDrag}
      onDrop={() => {
        handleFileChange();
      }}
      onDragEnter={handleDrag}
      sx={{
        backgroundColor: dragOver ? "#e6eefc" : "#dbd8d7",
        height: "30em",
        width: "40em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        border: dragOver ? "2px dotted black" : "2px solid black",
      }}
    >
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap=".5em"
        >
          {data.length ? (
            <Stack display="flex" alignItems="center">
              <h2> {tip} </h2>
              <Check sx={{ fontSize: "60px" }} color="success" />
            </Stack>
          ) : (
            <Box>
              <h2> {tip} </h2>
              <br />
              <LinearProgress color="success" />
            </Box>
          )}
        </Box>
      ) : (
        <>
          {" "}
          <input
            style={{
              border: "2px solid red",
              position: "relative",
              zIndex: 1,
              width: "10em",
              height: "10em",
              opacity: 0,
            }}
            onChange={handleFileChange}
            type="file"
            required
          />
          <Box
            display="flex"
            alignItems="center"
            position="absolute"
            flexDirection="column"
            width={"10em"}
            height={"10em"}
          >
            <IconButton>
              <UploadIcon sx={{ fontSize: "80px" }} />
            </IconButton>

            <Typography
              fontFamily="Geologica"
              width={200}
              fontSize={20}
              variant="caption"
              align="center"
            >
              Drag files to upload or{" "}
              <Chip
                sx={{ cursor: "pointer" }}
                label="Browse"
                size="large"
                color="primary"
              ></Chip>
            </Typography>
          </Box>{" "}
        </>
      )}
    </Box>
  );
}

export default FileUpload;
