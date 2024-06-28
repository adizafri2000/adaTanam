package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.SearchResponseDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import com.example.springbootbackend.service.produce.ProduceService;
import com.example.springbootbackend.service.store.StoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/search")
@Slf4j
public class SearchController {

    private final ProduceService produceService;
    private final StoreService storeService;

    public SearchController(ProduceService produceService, StoreService storeService) {
        this.produceService = produceService;
        this.storeService = storeService;
    }

    @GetMapping("")
    public SearchResponseDTO getAccounts(@RequestParam(required = true) String query) {
        log.info("Handling GET /search request with query: {}", query);
        List<ProduceResponseDTO> produceList = produceService.getProducesByName(query);
        List<StoreResponseDTO> storeList = storeService.getStoresByName(query);
        return new SearchResponseDTO(produceList, storeList);
    }

}
