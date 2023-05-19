package org.openapitools.api;

import org.openapitools.DBModel.User;
import org.openapitools.model.UserInfo;


import org.openapitools.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.context.request.NativeWebRequest;

import javax.validation.constraints.*;
import javax.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-05-19T18:59:56.083+03:00[Europe/Moscow]")
@Controller
@RequestMapping("${openapi.vegatablesAndFruits.base-path:}")
public class UserApiController implements UserApi {

    private final NativeWebRequest request;

    private final UserService service;

    @Autowired
    public UserApiController(NativeWebRequest request, UserService service) {
        this.request = request;
        this.service = service;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<UserInfo> userGet(String email, String password) {
        if((email != null || email != "") && (password != null || password != "")){
            List<User> users = service.GetAllUsers();
            User cur = users.stream()
                    .filter(u -> u.getEmail().equals(email) && u.getPassword().equals(password)).findFirst().orElse(null);
            if(cur != null){
                return ResponseEntity.ok(new UserInfo().appid(cur.getAppid()));
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> userPost(String email, String password) {
        if((email != null || email != "") && (password != null || password != "")){
            service.AddUser(email, password);
            return ResponseEntity.ok("Accepted");
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
