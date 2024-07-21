package org.akhil.assignmentauditor.dto;

import org.akhil.assignmentauditor.domain.Assignment;
import org.akhil.assignmentauditor.enums.AssignmentEnum;
import org.akhil.assignmentauditor.enums.AssignmentStatusEnum;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AssignmentResponseDTO {

    private Assignment assignment;
    private List<AssignmentEnumDTO> assignmentEnums;


    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();


    public AssignmentResponseDTO(Assignment assignment) {
        this.assignment = assignment;
        this.assignmentEnums = Stream.of(AssignmentEnum.values())
                .map(enumValue -> new AssignmentEnumDTO(enumValue.getAssignmentNum(), enumValue.getAssignmentName()))
                .collect(Collectors.toList());
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public List<AssignmentEnumDTO> getAssignmentEnums() {
        return assignmentEnums;
    }

    public void setAssignmentEnums(List<AssignmentEnumDTO> assignmentEnums) {
        this.assignmentEnums = assignmentEnums;
    }

    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }

}
