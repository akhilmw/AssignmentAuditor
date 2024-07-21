package org.akhil.assignmentauditor.controller;

import io.jsonwebtoken.ExpiredJwtException;
import org.akhil.assignmentauditor.domain.Authority;
import org.akhil.assignmentauditor.domain.User;
import org.akhil.assignmentauditor.dto.AuthCredentialsRequest;
import org.akhil.assignmentauditor.dto.LoginResponse;
import org.akhil.assignmentauditor.dto.UserDTO;
import org.akhil.assignmentauditor.exception.UsernameAlreadyExistsException;
import org.akhil.assignmentauditor.service.AuthenticationService;
import org.akhil.assignmentauditor.service.UserDetailsServiceImplementation;
import org.akhil.assignmentauditor.service.UserService;
import org.akhil.assignmentauditor.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;


    private final AuthenticationService authenticationService;
    private final UserDetailsServiceImplementation userDetailsServiceImplementation;

    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, AuthenticationService authenticationService, UserDetailsServiceImplementation userDetailsServiceImplementation, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.authenticationService = authenticationService;
        this.userDetailsServiceImplementation = userDetailsServiceImplementation;
        this.userService = userService;
    }



    @PostMapping("login")
    public ResponseEntity<?> login( @RequestBody AuthCredentialsRequest request) { 
        User authenticatedUser = authenticationService.authenticate(request);

        String jwtToken = jwtUtil.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtUtil.getExpirationTime());


        return ResponseEntity.ok()
                .header(
                        HttpHeaders.AUTHORIZATION,
                        loginResponse.getToken()
                ).body("Logged in successfully!!");
    }

    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token){

        try {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsServiceImplementation.loadUserByUsername(username);
            Boolean isTokenValid = jwtUtil.isTokenValid(token, userDetails);
            return  ResponseEntity.ok().body(isTokenValid);
        }catch (ExpiredJwtException e) {
//            e.printStackTrace();
            return  ResponseEntity.ok().body(false);
        }


    }

    @PostMapping("signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO){

        try {

            User user = new User();

            User existingUser = userService.findUserByUsername(userDTO.getUsername());

            if (existingUser != null && existingUser.getUsername() != null){
                throw new UsernameAlreadyExistsException("Username already exists!!");
            }

            user.setUsername(userDTO.getUsername());
            user.setPassword(userDTO.getPassword());

            List<Authority> authorities = userDTO.getAuthorities().stream()
                    .map(auth -> {
                        Authority authority = new Authority();
                        authority.setAuthority(auth);
                        authority.setUser(user);
                        return authority;
                    }).toList();

            user.setAuthorities(authorities);

            authenticationService.saveUser(user);

            return ResponseEntity.ok("User registered successfully");

        } catch (UsernameAlreadyExistsException usernameAlreadyExistsException) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(usernameAlreadyExistsException.getMessage());
        }

        catch (Exception exception) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }


    }



}
