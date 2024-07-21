import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getAssignmentById, updateAssignmentById } from "../../api/userApi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AssignmentStatusBadge from "../AssignmentStatusBadge";
import CommentContainer from "../CommentContainer";
import { showSuccessMsg } from "../../util/tools";

const CodeReviewerAssignmentView = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({
    githubURL: "",
    branch: "",
    number: "", // Initialize with an empty string
    status: "", // Default status
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [statusEnums, setStatusEnums] = useState([]);
  const statusRef = useRef(assignment.status);

  const updateAssignment = (key, value) => {
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [key]: value,
    }));
    if (key === "status") {
      statusRef.current = value; // Update statusRef when status changes
    }
  };

  // to persist in DB
  const handleAssignmentUpdate = (e) => {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter.name;

    let newStatus = assignment.status;

    if (buttonClicked === "Complete Review") {
      //   if (assignment.status === statusEnums[2]?.assignmentStatus) {
      //     console.log("updating to completed");
      //   }
      showSuccessMsg("Review completed!");
      newStatus = statusEnums[4]?.assignmentStatus;
    } else if (buttonClicked === "Reject Assignment") {
      showSuccessMsg("Assignment Rejected!");
      newStatus = statusEnums[3]?.assignmentStatus;
    } else {
      showSuccessMsg("Assignment Reclaimed!");
      newStatus = statusEnums[1]?.assignmentStatus;
    }

    updateAssignment("status", newStatus);

    updateAssignmentById(id, { ...assignment, status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          setAssignment(res.data);
          statusRef.current = res.data.status; // Update ref after response
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAssignmentById(id)
      .then((res) => {
        if (res.status === 200) {
          const newAssignment = res.data.assignment;
          setAssignment({
            ...newAssignment,
            githubURL: newAssignment.githubURL || "",
            branch: newAssignment.branch || "",
            number: newAssignment.number || "", // Ensure number is set
          });
          setAssignmentEnums(res.data.assignmentEnums);
          setStatusEnums(res.data.statusEnums);
          statusRef.current = newAssignment.status; // Initialize ref with current status
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Box className="flex items-center justify-center min-h-screen bg-blue-100">
      <Card className="w-full max-w-2xl bg-gray-100 mt-8 mb-8">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="text-center font-bold mb-4 text-blue-800"
          >
            {assignment.number === ""
              ? "Select an assignment number"
              : `Assignment ${assignment.number}`}
          </Typography>

          {assignment && (
            <>
              <Box className="flex justify-center mb-4 mt-2">
                <AssignmentStatusBadge label={assignment.status} />
              </Box>
              <form
                onSubmit={handleAssignmentUpdate}
                className="bg-white p-6 rounded-lg shadow-md space-y-4"
              >
                <a
                  href={assignment.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <TextField
                    fullWidth
                    label="Go to Github URL"
                    value={assignment.githubURL || ""}
                    variant="outlined"
                    type="url"
                    placeholder="https://github.com/something"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </a>

                <TextField
                  fullWidth
                  label="Branch"
                  value={assignment.branch || ""}
                  //   onChange={(e) => updateAssignment("branch", e.target.value)}
                  variant="outlined"
                  type="text"
                  placeholder="example_branch_name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Code Review Video URL"
                  value={assignment.codeReviewVideoURL || ""}
                  onChange={(e) =>
                    updateAssignment("codeReviewVideoURL", e.target.value)
                  }
                  variant="outlined"
                  type="text"
                  placeholder="https://vimeo.com/video_id"
                />
                <CardActions className="justify-between">
                  <Button
                    name="Complete Review"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Complete Review
                  </Button>
                  {assignment.status === "In Review" ? (
                    <Button
                      name="Reject Assignment"
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Reject Assignment
                    </Button>
                  ) : (
                    <Button
                      name="Re-Claim"
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Re-Claim
                    </Button>
                  )}
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="contained"
                    color="error"
                  >
                    Back
                  </Button>
                </CardActions>
              </form>
              {/* Comments container  */}
              <CommentContainer id={id} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CodeReviewerAssignmentView;
