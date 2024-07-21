import React, { useState, useEffect } from "react";
import Comments from "../Comments";
import {
  fetchCommentsByAssignmentId,
  updateCommentById,
  submitComment,
  deleteCommentById,
} from "../../api/userApi";
import { useJwt } from "../UserProvider";
import { TextField, Box, Typography, Button } from "@mui/material";
import { showSuccessMsg } from "../../util/tools";

const CommentContainer = (props) => {
  const { id } = props;

  const { jwtToken } = useJwt();

  const [comment, setComment] = useState({
    id: null,
    text: "",
    assignmentId: id,
    user: jwtToken,
  });

  const [comments, setComments] = useState([]);

  const updateComment = (value) => {
    const commentCopy = { ...comment };
    commentCopy.text = value;

    setComment(commentCopy);
  };

  useEffect(() => {
    const response = fetchCommentsByAssignmentId(id);
    response
      .then((res) => {
        if (res.status === 200) {
          setComments(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // method to submit the comment

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.id) {
      const response = updateCommentById(comment.id, comment);
      response
        .then((res) => {
          if (res.status === 200) {
            const commentToEditIdx = comments.findIndex(
              (com) => com.id === comment.id
            );
            showSuccessMsg("Comment Edited!!");
            const commentsCopy = [...comments];
            commentsCopy[commentToEditIdx] = res.data;
            setComments(commentsCopy);
            setComment({
              id: null,
              text: "",
              assignmentId: id,
              user: jwtToken,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      const response = submitComment(comment);
      response
        .then((res) => {
          if (res.status === 200) {
            showSuccessMsg("Comment Posted!!");
            const commentsCopy = [...comments];
            commentsCopy.push(res.data);
            setComments(commentsCopy);
            setComment({
              id: null,
              text: "",
              assignmentId: id,
              user: jwtToken,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // handle delete comment

  const handleDeleteComment = (commentId) => {
    const response = deleteCommentById(commentId);
    response
      .then((res) => {
        if (res.status === 200) {
          showSuccessMsg("Comment Deleted!!");
          const commentToDeleteIdx = comments.findIndex(
            (comment) => comment.id === commentId
          );
          const commentsCopy = [...comments];
          commentsCopy.splice(commentToDeleteIdx, 1);
          setComments(commentsCopy);
        }
      })
      .catch((err) => console.log(err));
  };

  // handle edit comment

  const handleEditComment = (commentId) => {
    const commentToEditIdx = comments.findIndex(
      (comment) => comment.id === commentId
    );
    setComment({
      ...comments[commentToEditIdx],
      assignmentId: id,
      user: jwtToken,
    });
  };

  return (
    <>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <TextField
          fullWidth
          label="Add a comment"
          multiline
          rows={4}
          value={comment.text}
          onChange={(e) => updateComment(e.target.value)}
          variant="outlined"
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mt-2"
          >
            Post Comment
          </Button>
        </Box>
      </form>
      {/* Comments Section */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        {comments.map((comment, index) => (
          <Comments
            key={index}
            text={comment.text}
            username={comment.createdBy.username}
            date={comment.createdDate}
            id={comment.id}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </Box>
    </>
  );
};

export default CommentContainer;
