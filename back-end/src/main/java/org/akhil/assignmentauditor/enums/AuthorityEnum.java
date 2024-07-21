package org.akhil.assignmentauditor.enums;

public enum AuthorityEnum {

    ROLE_CODE_REVIEWER("ROLE_CODE_REVIEWER"),
    ROLE_STUDENT("ROLE_STUDENT"),
    ROLE_ADMIN("ROLE_ADMIN");

    private final String authority;

    AuthorityEnum(String authority){
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }


}
