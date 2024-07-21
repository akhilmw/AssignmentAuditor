package org.akhil.assignmentauditor.dto;

public class AssignmentEnumDTO {

    private int assignmentNum;
    private String assignmentName;

    public AssignmentEnumDTO(int assignmentNum, String assignmentName) {
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }

    public int getAssignmentNum() {
        return assignmentNum;
    }

    public void setAssignmentNum(int assignmentNum) {
        this.assignmentNum = assignmentNum;
    }

    public String getAssignmentName() {
        return assignmentName;
    }

    public void setAssignmentName(String assignmentName) {
        this.assignmentName = assignmentName;
    }
}
