package com.example.springbootbackend.service.produce;

import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.model.Produce;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProduceService {
    List<ProduceResponseDTO> getProduces();
    ProduceResponseDTO getProduceById(Integer id);
    ProduceResponseDTO createProduce(ProduceRequestDTO produce);
    ProduceResponseDTO updateProduce(Integer id, ProduceRequestDTO produce, String token);
    void deleteProduce(Integer id, String token);
}
