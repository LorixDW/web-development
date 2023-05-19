package org.openapitools.repositories;

import org.openapitools.DBModel.DBEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntityRepo extends JpaRepository<DBEntity, Integer> {
}
