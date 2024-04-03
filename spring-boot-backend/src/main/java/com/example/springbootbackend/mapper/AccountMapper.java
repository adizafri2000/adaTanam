package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.account.AccountGetDTO;
import com.example.springbootbackend.dto.account.AccountPostDTO;
import com.example.springbootbackend.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);


    AccountGetDTO toGetDTO(Account account);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Account toEntity(AccountPostDTO accountPostDTO);

}