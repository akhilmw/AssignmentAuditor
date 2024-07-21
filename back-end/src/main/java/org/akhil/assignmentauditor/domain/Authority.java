package org.akhil.assignmentauditor.domain;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class Authority implements GrantedAuthority {

    private  String authority;
    @ManyToOne(optional = false)
    private User user;

    public  Authority() {

    }

    public Authority(String authority) {
        this.authority = authority;
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



}
