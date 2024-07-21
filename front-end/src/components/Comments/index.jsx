import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useJwt } from "../UserProvider";
import { jwtDecode } from "jwt-decode";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Comments = (props) => {
  const { jwtToken } = useJwt();

  const decodedToken = jwtDecode(jwtToken);

  const { id, text, username, date, emitDeleteComment, emitEditComment } = props;

  const usernameUpdated = username.split('@')[0];
  

  const [relativeTime, setRelativeTime] = useState("");

  const intervalRef = useRef(null);

  useEffect(() => {
    updateRelativeTime();
  }, [date]);

  const updateRelativeTime = () => {
    if (date) {
      const dateNow = dayjs();
      setRelativeTime(dateNow.from(date, true));
    }
  };

  useEffect(() => {
    // Set the interval and store the interval ID in the ref
    intervalRef.current = setInterval(() => {
      updateRelativeTime();
    }, 1000 * 61);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Box className="bg-white p-4 mt-2 rounded-lg shadow-sm relative">
      <Typography variant="body1" gutterBottom>
        {text}
      </Typography>
      <Typography variant="caption" color="textSecondary" display="block">
        <span className="font-bold">{usernameUpdated}</span> -{" "}
        {relativeTime ? `Posted ${relativeTime} ago` : ""}
      </Typography>
      {decodedToken.sub === username ? (
        <Box position="absolute" bottom={8} right={8}>
          <IconButton onClick={() => emitEditComment(id)} size="small">
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
          <IconButton
            onClick={() => emitDeleteComment(id)}
            size="small"
            style={{ marginLeft: "8px" }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Comments;
