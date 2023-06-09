import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Chip } from "@mui/material";
import { Check } from "@mui/icons-material";

function FileUpload() {
  const [tip, setTip] = useState("Uploading Files");
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitFile = (file) => {
    console.log(file);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    }).then((data) => {
      console.log(data);
      setData(data);
    });
    let iteration = 0;
    const id = setInterval(() => {
      setTip(tips[iteration]);
      if (iteration == tips.length) {
        setTip("Almost Done...");
        clearInterval(id);
      } else if (data) {
        console.log(data);
        setTip("Done");
      }
      iteration += 1;
    }, 3000);
  };

  const tips = [
    "Processing Files",
    "Analyzing Content",
    "Detecting Plagiarism",
    "Generating Reports",
    "Almost Done",
  ];

  const handleFileChange = (e) => {
    const event_file = e.target.files[0];
    console.log(event_file);
    submitFile(event_file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (dragOver) {
      setDragOver(false);
    }
  };

  return (
    <Box
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      sx={{
        backgroundColor: dragOver ? "#e6eefc" : "#dbd8d7",
        height: "30em",
        width: "40em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        border: dragOver ? "2px dotted black" : "2px solid black",
      }}
    >
      {loading ? (
        <Box>
          <h3> {tip} </h3>
          <br />
          {data ? (
            <Check color="success" />
          ) : (
            <LinearProgress color="success" />
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
