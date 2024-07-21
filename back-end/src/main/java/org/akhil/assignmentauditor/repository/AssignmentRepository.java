package org.akhil.assignmentauditor.repository;

import org.akhil.assignmentauditor.domain.Assignment;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByAssignedTo(User assignedTo);

    Optional<Assignment> getAssignmentById(Long id);

    @Query("Select a from Assignment a "
            + "where (a.status = 'submitted' and (a.codeReviewer is null  or a.codeReviewer = :codeReviewer))"
            + "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);
}
