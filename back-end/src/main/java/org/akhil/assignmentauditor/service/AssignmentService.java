package org.akhil.assignmentauditor.service;

import org.akhil.assignmentauditor.domain.Assignment;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.enums.AssignmentStatusEnum;
import org.akhil.assignmentauditor.enums.AuthorityEnum;
import org.akhil.assignmentauditor.repository.AssignmentRepository;
import org.akhil.assignmentauditor.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;


    public Assignment saveAssignment(User user) {

        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getAssignmentStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setAssignedTo(user);

        Assignment assignment1 = null;

        try {
            assignment1 = assignmentRepository.save(assignment);
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        return assignment1;

    }

    private int findNextAssignmentToSubmit(User user) {

        Set<Assignment> assignments = assignmentRepository.findByAssignedTo(user);
        if (assignments == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNumber = assignments.stream()
                .sorted((a1, a2) -> {
                    if (a1.getNumber() == null) return 1;
                    if (a2.getNumber() == null) return 1;
                    return a2.getNumber().compareTo(a1.getNumber());
                })
                .map(assignment -> {
                    if (assignment.getNumber() == null) return 1;
                    return assignment.getNumber() + 1;
                })
                .findFirst();

        return nextAssignmentNumber.orElse(1);
    }

    public Set<Assignment> fetchAllAssignments(User user) {

        // find by the roles of the user
        String codeReviewerAuthority = AuthorityEnum.ROLE_CODE_REVIEWER.getAuthority();

        boolean hasCodeReviewerRole = AuthorityUtil.hasRole(codeReviewerAuthority, user);

        if (hasCodeReviewerRole){
            return assignmentRepository.findByCodeReviewer(user);
        }else {
            return assignmentRepository.findByAssignedTo(user);
        }

    }


    public Optional<Assignment> getAssignmentById(Long id) {
        return assignmentRepository.getAssignmentById(id);
    }

    public Assignment updateAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
