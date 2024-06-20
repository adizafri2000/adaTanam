package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);

    // return boolean if account.type is equal to 'Farmer' based on given id
    boolean existsByIdAndType(Integer id, String type);

}
