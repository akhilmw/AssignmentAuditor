import React from "react";
import { Chip } from "@mui/material";

const AssignmentStatusBadge = (props) => {
  // the label is the assignment status
  const { label } = props;

  let backgroundColor = "";

  if (label === "Completed") {
    backgroundColor = "#4ef037";
  } else if (label === "Needs Update") {
    backgroundColor = "#c13131";
  } else if (label === "Pending Submission") {
    backgroundColor = "#ffdd00";
  } else if (label === "Resubmitted") {
    backgroundColor = "#6643b5"
  } else if (label === "In Review") {
    backgroundColor = "#e8630a"
  }
  else {
    backgroundColor = "#0092ca";
  }

  return (
    <Chip
      label={label}
      sx={{
        fontSize: "1rem",
        fontWeight: "bold",
        padding: "5px 10px",
        backgroundColor: { backgroundColor },
        color: "#fff",
        marginTop: "10px",
      }}
    />
  );
};

export default AssignmentStatusBadge;
