package org.openapitools.api;

import org.openapitools.DBModel.DBEntity;
import org.openapitools.DBModel.EntityType;
import org.openapitools.model.Entity;


import org.openapitools.services.EntityService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-05-19T18:59:56.083+03:00[Europe/Moscow]")
@Controller
@RequestMapping("${openapi.vegatablesAndFruits.base-path:}")
public class EntityApiController implements EntityApi {

    private final NativeWebRequest request;
    private final EntityService service;

    @Autowired
    public EntityApiController(NativeWebRequest request, EntityService service) {
        this.request = request;
        this.service = service;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

    @Override
    public ResponseEntity<String> entityDelete(Integer ID) {
        if(ID != null){
            service.DeleteEntity(ID);
            return ResponseEntity.ok("Accepted");
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<Entity>> entityGet(String type){
        List<Entity> entities = new ArrayList<>();
        service.GetAllEntity().forEach(e -> {
            Entity entity = new Entity();
            entity.id(e.getId());
            entity.name(e.getName());
            if(e.getType() == EntityType.VEGETABLE){
                entity.type(Entity.TypeEnum.VEGETABLES);
            } else if (e.getType() == EntityType.FRUIT) {
                entity.type(Entity.TypeEnum.FRUIT);
            }
            else {
                entity.type(Entity.TypeEnum.VEGETABLES);
            }
            entities.add(entity);
        });
        if (Entity.TypeEnum.VEGETABLES.toString().equals(type)){
            return new ResponseEntity<>(HttpStatus.OK).ok().body(entities.stream()
                    .filter(entity -> entity.getType() == Entity.TypeEnum.VEGETABLES)
                    .collect(Collectors.toList()));
        }
        else if (Entity.TypeEnum.FRUIT.toString().equals(type)){
            return new ResponseEntity<>(HttpStatus.OK).ok().body(entities.stream()
                    .filter(entity -> entity.getType() == Entity.TypeEnum.FRUIT)
                    .collect(Collectors.toList()));
        }
        else {
            return new ResponseEntity<>(HttpStatus.OK).ok().body(entities);
        }
    }

    @Override
    public ResponseEntity<String> entityPost(String type, String name) {
        if((type != null || type != "") && (name != null || name != "")){
            if(Entity.TypeEnum.VEGETABLES.toString().equals(type)){
                service.AddEntity(name, EntityType.VEGETABLE);
                return ResponseEntity.ok("Accepted");
            }
            else if (Entity.TypeEnum.FRUIT.toString().equals(type)){
                service.AddEntity(name, EntityType.FRUIT);
                return ResponseEntity.ok("Accepted");
            }
            else {
                System.out.println("Bad request: type = " + type);
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<String> entityPut(Integer ID, String type, String name) {
        System.out.println(ID + " " + type + " " + name);
        if(ID >= 1 && !type.equals("") && !name.equals("")){
            EntityType etype;
            if(Entity.TypeEnum.VEGETABLES.toString().equals(type)){
                etype = EntityType.VEGETABLE;
            }
            else if(Entity.TypeEnum.FRUIT.toString().equals(type)){
                etype = EntityType.FRUIT;
            }
            else {
                System.out.println("BAD Request: " + type);
                System.out.println(Entity.TypeEnum.FRUIT.equals(type));
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            DBEntity selected = service.GetEntityById(ID);
            if(selected != null){
                selected.setName(name);
                selected.setType(etype);
                service.SaveEntity(selected);
                return ResponseEntity.ok("Accepted");
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
