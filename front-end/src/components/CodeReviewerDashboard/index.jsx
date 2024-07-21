import React, { useEffect, useState } from "react";
import { getAllAssignments, updateAssignmentById } from "../../api/userApi";
import AssignmentCard from "../AssignmentCard";
import { jwtDecode } from "jwt-decode";
import { useJwt } from "../UserProvider";
import { showSuccessMsg } from "../../util/tools";

const CodeReviewerDashboard = () => {
  const {jwtToken, setJwtToken} = useJwt();
  const [assignments, setAssignments] = useState(null);

  const noAssignmentsFoundMsg = () => {
    return (
      <div className="text-red-500 text-2xl font-semibold col-span-full text-center py-8">
        No assignments Found!
      </div>
    );
  };

  const claimAssignment = (assignment) => {
    const decodedJwt = jwtDecode(jwtToken);
    const user = {
      id: null,
      username: decodedJwt.sub,
      authorities: decodedJwt.authorities,
    };
    assignment.codeReviewer = user;
    assignment.status = "In Review";
    const response = updateAssignmentById(assignment.id, assignment);
    response.then((res) => {
      if (res.status === 200) {
        showSuccessMsg("Assignment Claimed!!")
        let assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = res.data;
        setAssignments(assignmentsCopy);
      }
    });
  };

  const handleEditReview = (assignment) => {
    console.log("clicked edit by reviewer", assignment);
  };

  useEffect(() => {
    const response = getAllAssignments();
    response
      .then((res) => {
        if (res.status === 200) {
          let newAssignments = res.data;
          setAssignments(newAssignments);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (!assignments) {
    return null; // You might want to handle loading state differently
  }

  // Filter assignments into 3 categories based on their status
  const submittedAssignments = assignments.filter(
    (assignment) => assignment.status === "Submitted" || assignment.status === "Resubmitted"
  );
  // sort the submitted assignments such that the resubmitted ones are coming first
  submittedAssignments.sort((a, b) => {
    if (a.status === "Resubmitted") {
      return -1
    }else {
      return 1
    }
  })
  const inReviewAssignments = assignments.filter(
    (assignment) => assignment.status === "In Review"
  );
  const needsUpdateAssignments = assignments.filter(
    (assignment) => assignment.status === "Needs Update"
  );
  // const resubmittedAssignments = assignments.filter(
  //   (assignment) => assignment.status === "Resubmitted"
  // );

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      {" "}
      {/* Adjusted margin top and bottom */}
      {/* Submitted Assignments */}
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 w-full max-w-5xl min-h-[300px]">
        <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-gray-300 pb-2">
          Awaiting Review
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {submittedAssignments.length > 0 ? (
            submittedAssignments.map((assignment, idx) => (
              <AssignmentCard
                key={idx}
                assignment={assignment}
                isAwaiting={true}
                onButtonClick={claimAssignment}
                onEditClick={handleEditReview}
              />
            ))
          ) : (
            noAssignmentsFoundMsg()
          )}
        </div>
      </div>
      {/* In Review Assignments */}
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 w-full max-w-5xl min-h-[300px]">
        <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-gray-300 pb-2">
          In Review
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {inReviewAssignments.length > 0 ? (
            inReviewAssignments.map((assignment, idx) => (
              <AssignmentCard
                key={idx}
                assignment={assignment}
                isInReview={true}
                onEditClick={handleEditReview}
              />
            ))
          ) : (
            noAssignmentsFoundMsg()
          )}
        </div>
      </div>
      {/* Needs Update Assignments */}
      <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-8 w-full max-w-5xl min-h-[300px]">
        {" "}
        {/* Adjusted margin bottom */}
        <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-gray-300 pb-2">
          Needs Update
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {needsUpdateAssignments.length > 0 ? (
            needsUpdateAssignments.map((assignment, idx) => (
              <AssignmentCard key={idx} assignment={assignment} isNeedsUpdate = {true} />
            ))
          ) : (
            noAssignmentsFoundMsg()
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewerDashboard;
