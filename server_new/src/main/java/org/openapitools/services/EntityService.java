package org.openapitools.services;

import org.openapitools.DBModel.DBEntity;
import org.openapitools.DBModel.EntityType;
import org.openapitools.repositories.EntityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EntityService {
    private final EntityRepo repo;

    @Autowired
    public EntityService(EntityRepo repo){
        this.repo = repo;
    }

    public List<DBEntity> GetAllEntity(){
        return repo.findAll();
    }
    public void AddEntity(String name, EntityType type){
        DBEntity entity = new DBEntity();
        entity.setType(type);
        entity.setName(name);
        repo.save(entity);
    }
    public void SaveEntity(DBEntity entity){
        repo.save(entity);
    }
    public DBEntity GetEntityById(Integer id){
        return repo.findById(id).orElse(null);
    }

    public void DeleteEntity(Integer id){
        if(repo.findById(id).orElse(null) != null){
            repo.deleteById(id);
        }
    }
}
