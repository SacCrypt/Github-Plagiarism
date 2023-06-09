import { Box, Stack } from "@mui/material";
import React from "react";
import image1 from "../static/images/plagiarism1.jpg";
import image2 from "../static/images/plagiarism2.jpg";
import image3 from "../static/images/plagiarism3.jpg";

function LandingTwo() {
  const textStyle = {
    wordSpacing: 5,
    letterSpacing: 2,
    fontSize: 16,
    fontFamily: "Geologica",
    width: "40em",
    textAlign: "justify",
  };
  return (
    <Box padding={5} display="flex" flexDirection="column" gap={20}>
      <Stack
        display="flex"
        sx={{
          flexDirection: "row",
          width: "90%",
          gap: "5em",
          justifyContent: "space-around",
          border: "2px solid black",
          padding: "2em",
        }}
      >
        <img height={300} width={500} src={image1} />
        <p style={textStyle}>
          <h2> Why Plagiarism Checker ? </h2>
          <br />
          In the digital era, students of IT sector heavily rely on software
          development to create innovative products and services for their
          projects. However, the issue of software plagiarism has become a
          concern. Software plagiarism refers to the unauthorized copying,
          replication, or use of someone else's code without proper permission
          or attribution. We aim to shed light on software plagiarism, its
          consequences, and how universities can prevent and address it.
        </p>
      </Stack>
      <Stack
        sx={{
          flexDirection: "row",
          width: "90%",
          gap: "5em",
          justifyContent: "space-around",
          border: "2px solid black",
          padding: "2em",
        }}
      >
        <p style={textStyle}>
          <h2> Consequences ! </h2>
          <br />
          <br />
          <p>Legal Ramifications:</p>
          <br />
          Software plagiarism often infringes upon copyright laws and can lead
          to costly legal disputes. Individuals or organizations found guilty of
          copyright infringement may face financial penalties, damage to their
          reputation, and even legal injunctions.
          <br />
          <br />
          <p>Damage to Reputation:</p>
          <br /> Engaging in software plagiarism tarnishes the reputation of
          individuals and institutes. It erodes trust among peers, clients, and
          the broader developer community. By adhering to ethical practices, we
          strive to maintain our reputation as a reliable and trustworthy
          partner in software development. <br />
          <br />
          Stifled Innovation:
          <br />
          <br />
          Plagiarism inhibits innovation and hinders progress in the software
          industry. It discourages creativity, discourages investment in
          research and development, and stifles the growth of new ideas. We
          believe in fostering a culture of innovation, originality, and
          creativity.
        </p>
        <img height={400} width={700} src={image2} />
      </Stack>
      <Stack
        display="flex"
        sx={{
          flexDirection: "row",
          width: "90%",
          gap: "5em",
          justifyContent: "space-around",
          border: "2px solid black",
          padding: "2em",
        }}
      >
        <img height={400} width={700} src={image3} />
        <p style={textStyle}>
          {" "}
          <h2> Prevention </h2>
          <br />
          <br />
          Preventing Software Plagiarism:
          <br /> <br />
          We are committed to promoting ethical coding practices and preventing
          software plagiarism within our organization and the industry. Here are
          some steps we take:
          <br /> <br />
          Education and Awareness:
          <br />
          <br /> We educate our developers about the importance of ethical
          coding practices and the consequences of software plagiarism. Our team
          members are encouraged to stay updated with the latest industry
          standards and best practices.
          <br /> <br />
          Strong Code Review Processes:
          <br />
          <br />
          We implement rigorous code review processes to detect and address any
          instances of software plagiarism. By having experienced developers
          review code regularly, we ensure that all code is original, properly
          attributed, and adheres to legal and ethical standards.
        </p>
      </Stack>
    </Box>
  );
}

export default LandingTwo;
