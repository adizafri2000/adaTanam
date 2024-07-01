package com.example.springbootbackend.service.produce;

import java.util.List;
import java.util.stream.Collectors;

import com.example.springbootbackend.repository.AccountRepository;
import com.example.springbootbackend.service.BlobStorageService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.ProduceMapper;
import com.example.springbootbackend.model.Produce;
import com.example.springbootbackend.repository.ProduceRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ProduceServiceImpl implements ProduceService {
    private final ProduceRepository produceRepository;
    private final AccountRepository accountRepository;
    private final TokenService tokenService;
    private final BlobStorageService blobStorageService;
    private final ProduceMapper produceMapper = ProduceMapper.INSTANCE;

    public ProduceServiceImpl(ProduceRepository produceRepository, AccountRepository accountRepository, TokenService tokenService, BlobStorageService blobStorageService) {
        this.produceRepository = produceRepository;
        this.accountRepository = accountRepository;
        this.tokenService = tokenService;
        this.blobStorageService = blobStorageService;
    }

    @Override
    public List<ProduceResponseDTO> getProduces() {
        log.info("Getting all produce");
        return produceRepository.findAll().stream().map(produceMapper::toResponseDTO).toList();
    }

    @Override
    public List<ProduceResponseDTO> getProduceByStore(Integer storeId) {
        log.info("Getting produce for store: {}", storeId);
        return produceRepository.findByStore(storeId).stream().map(produceMapper::toResponseDTO).toList();
    }

    @Override
    public List<ProduceResponseDTO> getProducesByName(String query){
        log.info("Getting produce by name: {}", query);
        return produceRepository.findByNameContainingIgnoreCase(query).stream().map(produceMapper::toResponseDTO).toList();
    }

    @Override
    public ProduceResponseDTO getProduceById(Integer id) {
        log.info("Getting produce with id: {}", id);
        return produceRepository.findById(id).map(produceMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Produce not found with id " + id));
    }

    @Override
    public List<ProduceResponseDTO> getTopRatedProduces() {
        log.info("Getting top rated produce");

        // Fetch the top 5 produces ordered by ratingScore in descending order
        return produceRepository.findTop5ByOrderByRatingScoreDesc().stream()
                // Filter out produces where ratingCount is null or 0
                .filter(produce -> produce.getRatingCount() != null && produce.getRatingCount() > 0)
                // Map the remaining produces to ProduceResponseDTO
                .map(produceMapper::toResponseDTO)
                // Collect the results into a list
                .collect(Collectors.toList());
    }

    public List<ProduceResponseDTO> getLatestCreatedProduces(){
        log.info("Getting latest created produce");
        return produceRepository.findTop5ByOrderByCreatedAtDesc().stream().map(produceMapper::toResponseDTO).toList();
    }
    public List<ProduceResponseDTO> getLatestUpdatedProduces(){
        log.info("Getting latest updated produce");
        return produceRepository.findTop5ByOrderByUpdatedAtDesc().stream().map(produceMapper::toResponseDTO).toList();
    }


    @Override
    public ProduceResponseDTO createProduce(ProduceRequestDTO produce, String token, MultipartFile image) {
        log.info("Creating produce: {}", produce);

        String email = tokenService.getEmailFromToken(token);
        accountRepository.findByEmail(email).ifPresentOrElse(account -> {
            // check if token owner is a farmer
            if(!account.getType().equals("Farmer")) {
                throw new AccessDeniedException("You do not have permission to create produce");
            }
        }, () -> {
            throw new ResourceNotFoundException("Account not found with email " + email);
        });

        Produce newProduce = produceRepository.save(produceMapper.toEntity(produce));
        if(image != null) {
            String imageUrl = blobStorageService.uploadImage(image, newProduce.getId(), PRODUCE_FOLDER_NAME);
            newProduce.setImage(imageUrl);
            produceRepository.save(newProduce);
        }
        return produceMapper.toResponseDTO(newProduce);
    }

    @Override
    public ProduceResponseDTO updateProduce(Integer id, ProduceRequestDTO produce, String token, MultipartFile image) {
        log.info("Updating produce with id: {}", id);

        Produce produceToUpdate = produceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produce not found with id " + id));

        // check if token owner is the owner of the produce
        String email = tokenService.getEmailFromToken(token);
        if(!produceToUpdate.getProduceStore().getFarmerAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this produce");
        }

        produceToUpdate.setName(produce.name());
        produceToUpdate.setType(produce.type());
        produceToUpdate.setStock(produce.stock());
        produceToUpdate.setUnitPrice(produce.unitPrice());
        produceToUpdate.setSellingUnit(produce.sellingUnit());
        produceToUpdate.setDescription(produce.description());
        produceToUpdate.setStatus(produce.status());

        if (image != null) {
            String imageUrl = blobStorageService.uploadImage(image, produceToUpdate.getId(), PRODUCE_FOLDER_NAME);
            produceToUpdate.setImage(imageUrl);
        }
        else log.info("No image to update");

        return produceMapper.toResponseDTO(produceRepository.save(produceToUpdate));
    }

    @Override
    public void deleteProduce(Integer id, String token) {
        log.info("Deleting produce with id: {}", id);
        Produce produceToDelete = produceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produce not found with id " + id));

        // check if token owner is the owner of the produce
        String email = tokenService.getEmailFromToken(token);
        if(!produceToDelete.getProduceStore().getFarmerAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to delete this produce");
        }

        produceRepository.delete(produceToDelete);
    }
}
