import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AssignmentStatusBadge from "../AssignmentStatusBadge";

const AssignmentCard = ({
  assignment,
  isAwaiting,
  isInReview,
  onButtonClick,
  onEditClick,
  isNeedsUpdate
}) => {
  const handleClaimAssignment = () => {
    onButtonClick(assignment);
  };

  const handleEditReview = () => {
    onEditClick(assignment);
  };

  return (
    <Card
      className="m-4 shadow-lg relative"
      sx={{
        maxWidth: 345,
        backgroundColor: "#f0f4f8",
        border: "1px solid #d1d9e6",
        minHeight: "300px",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          className=" flex items-center justify-center font-bold text-blue-800 mb-4"
        >
          Assignment : {assignment.number}
        </Typography>
        <Box className="flex items-center justify-center mb-4">
        <AssignmentStatusBadge label = {assignment.status}/>
        </Box>
        <Typography variant="body2" color="text.primary" className="mb-2">
          <span className="font-semibold text-lg text-gray-800">
            GitHub URL:{" "}
          </span>
          <a
            href={assignment.githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-words"
          >
            {assignment.githubURL}
          </a>
        </Typography>
        <Typography variant="body2" color="text.primary" className="mb-4">
          <span className="font-semibold text-lg text-gray-800">Branch: </span>
          <span className="text-blue-700">{assignment.branch}</span>
        </Typography>
      </CardContent>
      <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
        {isAwaiting ? (
          <Button
            onClick={handleClaimAssignment}
            variant="contained"
            color="primary"
          >
            Claim
          </Button>
        ) : isInReview ? (
          <Link to={`/assignments/${assignment.id}`} className="no-underline">
            <Button
              variant="contained"
              color="primary"
              endIcon={<FontAwesomeIcon icon={faPenToSquare} />}
              onClick={handleEditReview}
            >
              Edit
            </Button>
          </Link>
        ) : isNeedsUpdate ? (
          <Link to={`/assignments/${assignment.id}`} className="no-underline">
            <Button
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </Link>
        )
        : (
          <Link to={`/assignments/${assignment.id}`} className="no-underline">
            <Button
              variant="contained"
              color="primary"
              endIcon={<FontAwesomeIcon icon={faPenToSquare} />}
            >
              Edit
            </Button>
          </Link>
        )}
      </Box>
    </Card>
  );
};

export default AssignmentCard;
