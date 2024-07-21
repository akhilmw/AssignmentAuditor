import React, { useEffect, useState } from "react";
import { createAssignment, getAllAssignments } from "../../api/userApi";
import AssignmentCard from "../AssignmentCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [assignments, setAssignments] = useState(null);

  let navigate = useNavigate();


  // Fetch assignments from the backend on page load using useEffect
  useEffect(() => {
    const response = getAllAssignments();
    
    response
      .then((res) => {
        if (res.status === 200) {
          let newAssignments = res.data;
          console.log(newAssignments)
          setAssignments(newAssignments);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  

  const handleCreateAssignment = () => {
    const data = {};
    const response = createAssignment(data);
    response
      .then((res) => {
        const assignment = res.data;
        // window.location.href = `/assignments/${assignment.id}`;
        navigate(`/assignments/${assignment.id}`)
        window.location.reload();

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {assignments ? (
          assignments.map((assignment, idx) => (
            <div key={idx}>
              <AssignmentCard key={idx} assignment={assignment} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {assignments && assignments.length >= 14 ? 
      <></> : (<button
        onClick={handleCreateAssignment}
        className="m-2 mb-4 p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
      >
        Submit a new assignment
      </button>
      )}
      
    </div>
  );
};

export default Dashboard;
