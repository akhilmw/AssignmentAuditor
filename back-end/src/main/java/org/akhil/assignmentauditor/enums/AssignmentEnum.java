package org.akhil.assignmentauditor.enums;

public enum AssignmentEnum {

    ASSIGNMENT_1(1, "HTML Assignment"),
    ASSIGNMENT_2(2, "Guessing Game"),
    ASSIGNMENT_3(3, "User Login"),
    ASSIGNMENT_4(4, "Student Course List"),
    ASSIGNMENT_5(5, "Custom Array List"),
    ASSIGNMENT_6(6, "Reports with streams"),
    ASSIGNMENT_7(7, "Unit Testing"),
    ASSIGNMENT_8(8, "Multi-Threading"),
    ASSIGNMENT_9(9, "Spring MVC"),
    ASSIGNMENT_10(10, "RESTful Service"),
    ASSIGNMENT_11(11, "Full stack with thymeleaf"),
    ASSIGNMENT_12(12, "Reports with SQL"),
    ASSIGNMENT_13(13, "Online Bank"),
    ASSIGNMENT_14(14, "Chatting with JS");

    private int assignmentNum;
    private String assignmentName;


    AssignmentEnum(int assignmentNum, String assignmentName) {
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }

    public int getAssignmentNum() {
        return assignmentNum;
    }


    public String getAssignmentName() {
        return assignmentName;
    }



}
