package org.openapitools.services;

import org.openapitools.DBModel.User;
import org.openapitools.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class UserService {
    private final UserRepo repo;
    @Autowired
    public UserService(UserRepo repo){
        this.repo = repo;
    }
    public List<User> GetAllUsers(){
        return repo.findAll();
    }
    public void AddUser(String email, String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setAppid(Base64.getEncoder().encodeToString(email.getBytes()));
        repo.save(user);
    }
}
