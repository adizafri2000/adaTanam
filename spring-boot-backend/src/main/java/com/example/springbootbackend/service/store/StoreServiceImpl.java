package com.example.springbootbackend.service.store;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.store.StoreRequestDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.StoreMapper;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.model.Store;
import com.example.springbootbackend.repository.StoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StoreServiceImpl implements StoreService{

    private final StoreRepository storeRepository;
    private final TokenService tokenService;
    private final StoreMapper storeMapper = StoreMapper.INSTANCE;

    public StoreServiceImpl(StoreRepository storeRepository, TokenService tokenService) {
        this.storeRepository = storeRepository;
        this.tokenService = tokenService;
    }

    @Override
    public List<StoreResponseDTO> getStores() {
        return storeRepository.findAll().stream().map(storeMapper::toResponseDTO).toList();
    }

    @Override
    public StoreResponseDTO getStoreById(Integer id) {
        log.info("Getting store with id: {}", id);
        return storeRepository.findById(id).map(storeMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id " + id));
    }

    @Override
    public List<StoreResponseDTO> getStoresByName(String query){
        log.info("Getting all stores with name: {}", query);
        return storeRepository.findByNameContaining(query).stream().map(storeMapper::toResponseDTO).toList();
    }

    @Override
    public StoreResponseDTO getStoreByFarmer(Integer farmerId) {
        log.info("Getting store with farmer id: {}", farmerId);
        return storeRepository.findByFarmer(farmerId).map(storeMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found for farmer with id " + farmerId));
    }

    @Override
    public List<StoreResponseDTO> getTopStores() {
        log.info("Getting top 5 stores");

        // Fetch the top 5 stores ordered by ratingScore in descending order
        return storeRepository.findTop5ByOrderByRatingScoreDesc().stream()
                // Filter out stores where ratingCount is null or 0
                .filter(store -> store.getRatingCount() != null && store.getRatingCount() > 0)
                // Map the remaining stores to StoreResponseDTO
                .map(storeMapper::toResponseDTO)
                // Collect the results into a list
                .collect(Collectors.toList());
    }


    @Override
    public StoreResponseDTO createStore(StoreRequestDTO store) {
        log.info("Creating store: {}", store);
        Store newStore = storeMapper.toEntity(store);
        if(storeRepository.findByFarmer(newStore.getFarmer()).isPresent()) {
            Account farmerAccount = storeRepository.findAccountByFarmer(newStore.getFarmer())
                    .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + newStore.getFarmer()));
            throw new DuplicateUniqueResourceException("Farmer with email: " + farmerAccount.getEmail() + " already has a store.");
        }
//        if (newStore.getCreatedAt() == null) {
//            newStore.setCreatedAt(new Timestamp(System.currentTimeMillis()));
//        }
//        if (newStore.getUpdatedAt() == null) {
//            newStore.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
//        }
        return storeMapper.toResponseDTO(storeRepository.save(newStore));
    }

    @Override
    public StoreResponseDTO updateStore(Integer id, StoreRequestDTO updateStore, String token) {
        log.info("Updating store with id: {}", id);

        // check if store exists
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id " + id));

        // check if user from token is owner of store
        String email = tokenService.getEmailFromToken(token);
        if (!store.getFarmerAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this account");
        }

        store.setName(updateStore.name());
        store.setLongitude(updateStore.latitude());
        store.setLatitude(updateStore.longitude());
        store.setBankName(updateStore.bankName());
        store.setBankNumber(updateStore.bankNumber());

        return storeMapper.toResponseDTO(storeRepository.save(store));
    }

    @Override
    public void deleteStore(Integer id, String token) {
        log.info("Deleting store with id: {}", id);
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id " + id));

        String email = tokenService.getEmailFromToken(token);
        if (!store.getFarmerAccount().getEmail().equals(email)) {
            throw new ResourceNotFoundException("You do not have permission to delete this store");
        }
        storeRepository.deleteById(id);
    }
}
