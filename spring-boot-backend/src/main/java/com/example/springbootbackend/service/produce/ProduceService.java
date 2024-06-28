package com.example.springbootbackend.service.produce;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ProduceService {
    public final static String PRODUCE_FOLDER_NAME = "produce-pictures";
    List<ProduceResponseDTO> getProduces();
    List<ProduceResponseDTO> getProduceByStore(Integer storeId);
    List<ProduceResponseDTO> getProducesByName(String query);
    ProduceResponseDTO getProduceById(Integer id);
    ProduceResponseDTO createProduce(ProduceRequestDTO produce, String token, MultipartFile image);
    ProduceResponseDTO updateProduce(Integer id, ProduceRequestDTO produce, String token, MultipartFile image);
    void deleteProduce(Integer id, String token);
}
