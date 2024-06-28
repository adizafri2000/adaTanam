package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Produce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduceRepository extends JpaRepository<Produce, Integer> {

    List<Produce> findByStore(Integer storeId);

    // to get all produce by name
    List<Produce> findByNameContaining(String name);
}
