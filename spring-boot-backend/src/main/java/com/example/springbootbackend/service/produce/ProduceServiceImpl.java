package com.example.springbootbackend.service.produce;

import java.sql.Timestamp;
import java.util.List;

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

@Service
@Slf4j
public class ProduceServiceImpl implements ProduceService {
    private final ProduceRepository produceRepository;
    private final TokenService tokenService;
    private final ProduceMapper produceMapper = ProduceMapper.INSTANCE;

    public ProduceServiceImpl(ProduceRepository produceRepository, TokenService tokenService) {
        this.produceRepository = produceRepository;
        this.tokenService = tokenService;
    }

    @Override
    public List<ProduceResponseDTO> getProduces() {
        log.info("Getting all produce");
        return produceRepository.findAll().stream().map(produceMapper::toResponseDTO).toList();
    }

    @Override
    public ProduceResponseDTO getProduceById(Integer id) {
        log.info("Getting produce with id: {}", id);
        return produceRepository.findById(id).map(produceMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Produce not found with id " + id));
    }

    @Override
    public ProduceResponseDTO createProduce(ProduceRequestDTO produce) {
        log.info("Creating produce: {}", produce);
        Produce newProduce = produceMapper.toEntity(produce);
        return produceMapper.toResponseDTO(produceRepository.save(newProduce));
    }

    @Override
    public ProduceResponseDTO updateProduce(Integer id, ProduceRequestDTO produce, String token) {
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
        produceToUpdate.setImage(produce.image());

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
