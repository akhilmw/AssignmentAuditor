package org.akhil.assignmentauditor.service;

import org.akhil.assignmentauditor.domain.Assignment;
import org.akhil.assignmentauditor.domain.Comment;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.dto.CommentDTO;
import org.akhil.assignmentauditor.repository.AssignmentRepository;
import org.akhil.assignmentauditor.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;
    public Comment save(CommentDTO commentDTO, User user) {

        Comment comment = new Comment();
        comment.setText(commentDTO.getText());
        comment.setCreatedBy(user);
        Assignment assignment = assignmentRepository.findById(commentDTO.getAssignmentId()).orElse(new Assignment());
        comment.setAssignment(assignment);
        comment.setCreatedDate(LocalDateTime.now());

        return commentRepository.save(comment);

    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {

        return commentRepository.findByAssignmentId(assignmentId);


    }

    public Comment updateCommentById(Comment comment) {

        return commentRepository.save(comment);
    }

    public void deleteCommentById(Long id) {

        commentRepository.deleteById(id);
    }
}
