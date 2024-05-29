package com.example.springbootbackend.service.store;

import com.example.springbootbackend.dto.store.StoreRequestDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StoreService {
    List<StoreResponseDTO> getStores();
    StoreResponseDTO getStoreById(Integer id);
    StoreResponseDTO createStore(StoreRequestDTO store);
    StoreResponseDTO updateStore(Integer id, StoreRequestDTO store, String token);
    void deleteStore(Integer id, String token);
}
