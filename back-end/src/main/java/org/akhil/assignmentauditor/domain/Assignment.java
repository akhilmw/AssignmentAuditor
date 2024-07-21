package org.akhil.assignmentauditor.domain;

import jakarta.persistence.*;

@Entity
public class Assignment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer number;

    private String status;

    private String githubURL;
    private String branch;
    private String codeReviewVideoURL;
    @ManyToOne(optional = false)
    private User assignedTo;   // This denotes the student who created the assignment

    @ManyToOne
    private User codeReviewer;  // This denotes the code reviewer who picks up the assignment

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGithubURL() {
        return githubURL;
    }

    public void setGithubURL(String githubURL) {
        this.githubURL = githubURL;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewVideoURL() {
        return codeReviewVideoURL;
    }

    public void setCodeReviewVideoURL(String codeReviewVideoURL) {
        this.codeReviewVideoURL = codeReviewVideoURL;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public User getCodeReviewer() {
        return codeReviewer;
    }

    public void setCodeReviewer(User codeReviewer) {
        this.codeReviewer = codeReviewer;
    }
}
