import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAssignmentById,
  updateAssignmentById
} from "../../api/userApi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AssignmentStatusBadge from "../AssignmentStatusBadge";
import CommentContainer from "../CommentContainer";
import { showSuccessMsg, showErrorMsg } from "../../util/tools";

const AssignmentView = () => {
  // this is the assignment id
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

    let newStatus = assignment.status;

    // pending submission to submitted
    if (assignment.status === statusEnums[0]?.assignmentStatus) {
      newStatus = statusEnums[1]?.assignmentStatus;
    } else if (assignment.status === statusEnums[3].assignmentStatus) {
      // needs update to resubmitted
      newStatus = statusEnums[5]?.assignmentStatus;
    }

    // TODO : handle the rest of the cases

    updateAssignment("status", newStatus);

    updateAssignmentById(id, { ...assignment, status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          showSuccessMsg("Assignment Submitted Successfully!")
          setAssignment(res.data);
          statusRef.current = res.data.status; // Update ref after response
        }
      })
      .catch((err) => {console.log(err)
        showErrorMsg(`Error : ${err}`)
      });
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
                <Box ml="auto">
                  <FormControl
                    variant="outlined"
                    size="small"
                    style={{ minWidth: "120px" }}
                  >
                    <InputLabel id="assignment-number-label">
                      Assignment #
                    </InputLabel>
                    <Select
                      labelId="assignment-number-label"
                      id="assignment-number"
                      value={assignment.number}
                      onChange={(e) =>
                        updateAssignment("number", e.target.value)
                      }
                      label="Assignment Number"
                      style={{ minWidth: "120px" }}
                    >
                      {assignmentEnums.map((enums) => (
                        <MenuItem
                          key={enums.assignmentNum}
                          value={enums.assignmentNum}
                        >
                          {enums.assignmentNum}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <form
                onSubmit={handleAssignmentUpdate}
                className="bg-white p-6 rounded-lg shadow-md space-y-4"
              >
                <TextField
                  fullWidth
                  label="Github URL"
                  value={assignment.githubURL || ""}
                  onChange={(e) =>
                    updateAssignment("githubURL", e.target.value)
                  }
                  variant="outlined"
                  type="url"
                  placeholder="https://github.com/something"
                />
                <TextField
                  fullWidth
                  label="Branch"
                  value={assignment.branch || ""}
                  onChange={(e) => updateAssignment("branch", e.target.value)}
                  variant="outlined"
                  type="text"
                  placeholder="example_branch_name"
                />
                {assignment.status === "Completed" ||
                assignment.status === "Needs Update" ? (
                  <>
                    <Box mt={2}>
                      <a
                        href={assignment.codeReviewVideoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <TextField
                          fullWidth
                          label="Go to Code Review Video URL"
                          value={assignment.codeReviewVideoURL || ""}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="outlined"
                          type="text"
                        />
                      </a>
                    </Box>
                    {assignment.status === "Needs Update" ? (
                      <CardActions className="justify-between">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Resubmit Assignment
                        </Button>
                        <Button
                          component={Link}
                          to="/dashboard"
                          variant="contained"
                          color="error"
                        >
                          Back
                        </Button>
                      </CardActions>
                    ) : (
                      <Button
                        component={Link}
                        to="/dashboard"
                        variant="contained"
                        color="error"
                      >
                        Back
                      </Button>
                    )}
                  </>
                ) : assignment.status === "Pending Submission" ? (
                  <CardActions className="justify-between">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit Assignment
                    </Button>
                    <Button
                      component={Link}
                      to="/dashboard"
                      variant="contained"
                      color="error"
                    >
                      Back
                    </Button>
                  </CardActions>
                ) : (
                  <CardActions className="justify-between">
                    <Button
                      component={Link}
                      to="/dashboard"
                      variant="contained"
                      color="error"
                    >
                      Back
                    </Button>
                  </CardActions>
                )}
              </form>
              <CommentContainer id={id} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssignmentView;
