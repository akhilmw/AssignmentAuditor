package org.akhil.assignmentauditor.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("Pending Submission", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In Review", 3),
    NEEDS_UPDATE("Needs Update", 4),
    COMPLETED("Completed", 5),
    RESUBMITTED("Resubmitted", 6);
    private String assignmentStatus;
    private int step;

    AssignmentStatusEnum(String assignmentStatus, int step) {
        this.assignmentStatus = assignmentStatus;
        this.step = step;
    }

    public String getAssignmentStatus() {
        return assignmentStatus;
    }

    public int getStep() {
        return step;
    }


}
