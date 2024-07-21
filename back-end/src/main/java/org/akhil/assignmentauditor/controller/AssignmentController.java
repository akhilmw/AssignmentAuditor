package org.akhil.assignmentauditor.controller;

import org.akhil.assignmentauditor.domain.Assignment;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.dto.AssignmentResponseDTO;
import org.akhil.assignmentauditor.enums.AuthorityEnum;
import org.akhil.assignmentauditor.service.AssignmentService;
import org.akhil.assignmentauditor.service.UserService;
import org.akhil.assignmentauditor.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){

        Assignment newAssignment = assignmentService.saveAssignment(user);


        return ResponseEntity.ok().body(newAssignment);
    }

    @GetMapping
    public ResponseEntity<?> fetchAllAssignments(@AuthenticationPrincipal User user) {

        Set<Assignment> assignments = assignmentService.fetchAllAssignments(user);

        return ResponseEntity.ok().body(assignments);
    }

    @GetMapping("/{id}")
    public  ResponseEntity<?> fetchAssignmentById(@PathVariable Long id) {

        Optional<Assignment> assignment = assignmentService.getAssignmentById(id);

        AssignmentResponseDTO assignmentResponse = new AssignmentResponseDTO(assignment.orElse(new Assignment()));

        return  ResponseEntity.ok().body(assignmentResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAssignmentById(@PathVariable Long id, @RequestBody Assignment assignment, User user) {

        // assign code reviewer to assignment when he/she claims it.
        // TODO: try to leverage the user from authentication principal
        if (assignment.getCodeReviewer() != null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername());

            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.getAuthority(), codeReviewer)) {
                assignment.setCodeReviewer(codeReviewer);
            }
        }

        Assignment updatedAssignment = assignmentService.updateAssignment(assignment);

        return ResponseEntity.ok().body(updatedAssignment);
    }



}
