package org.akhil.assignmentauditor.service;

import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User findUserByUsername(String username) {

        return userRepository.findByUsername(username).orElse(new User());

    }

}
