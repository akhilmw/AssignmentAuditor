package org.akhil.assignmentauditor.controller;

import org.akhil.assignmentauditor.domain.Comment;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.dto.CommentDTO;
import org.akhil.assignmentauditor.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal User user) {

        Comment comment = commentService.save(commentDTO, user);


        return ResponseEntity.ok(comment);

    }

    @GetMapping
    public ResponseEntity<?> getCommentsByAssignment(@RequestParam Long assignmentId) {

        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);

        return ResponseEntity.ok(comments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCommentById(@PathVariable Long id, @RequestBody Comment comment) {

        Comment updatedComment = commentService.updateCommentById(comment);

        return ResponseEntity.ok((updatedComment));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCommentById(@PathVariable Long id) {

        try {
            commentService.deleteCommentById(id);

            return ResponseEntity.ok(null);

        }catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the comment");
        }

    }

}
