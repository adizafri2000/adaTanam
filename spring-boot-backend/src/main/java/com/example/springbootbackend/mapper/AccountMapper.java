package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.AccountGetDTO;
import com.example.springbootbackend.dto.AccountPostDTO;
import com.example.springbootbackend.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountPostDTO toPostDTO(Account account);
    AccountGetDTO toGetDTO(Account account);
    Account toEntity(AccountPostDTO accountPostDTO);
    Account toEntity(AccountGetDTO accountGetDTO);


}