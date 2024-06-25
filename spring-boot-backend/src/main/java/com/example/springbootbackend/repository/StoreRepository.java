package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
    // to find specific store via farmer ID
    Optional<Store> findByFarmer(Integer farmer);

    // to find specific account via farmer ID
    @Query("SELECT a FROM Account a WHERE a.id = :farmer")
    Optional<Account> findAccountByFarmer(@Param("farmer") Integer farmer);

}
