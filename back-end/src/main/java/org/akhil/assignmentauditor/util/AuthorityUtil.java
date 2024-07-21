package org.akhil.assignmentauditor.util;

import org.akhil.assignmentauditor.domain.User;

public class AuthorityUtil {

    public static Boolean hasRole(String role, User user) {

        return user.getAuthorities()
                .stream()
                .anyMatch(auth -> role.equals(auth.getAuthority()));

    }
}
