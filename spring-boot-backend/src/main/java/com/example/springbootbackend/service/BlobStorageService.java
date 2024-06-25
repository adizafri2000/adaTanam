package com.example.springbootbackend.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@Slf4j
public class BlobStorageService {

    private final BlobServiceClient blobServiceClient;
    private final String containerName;

    public BlobStorageService(@Value("${spring.cloud.azure.storage.blob.connection-string}") String connectionString,
                              @Value("${spring.cloud.azure.storage.blob.container-name}") String containerName) {
        this.blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
        this.containerName = containerName;
    }

    public String uploadImage(MultipartFile image, Integer userId, String folderName) {
        try {
            log.info("Uploading image to blob storage, userId: {}, folderName: {}, image: {}", userId, folderName, image.getOriginalFilename());
            String originalFilename = image.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            String newFilename = userId + extension;
            log.info("New filename: {}", newFilename);
            String blobName = folderName + "/" + newFilename;
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            BlobClient blobClient = containerClient.getBlobClient(blobName);
            try (InputStream inputStream = image.getInputStream()) {
                BlobParallelUploadOptions options = new BlobParallelUploadOptions(inputStream, image.getSize())
                        .setHeaders(new BlobHttpHeaders().setContentType(image.getContentType()));
                blobClient.uploadWithResponse(options, null, null);
            }
            return blobClient.getBlobUrl();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to blob storage", e);
        }
    }

    public void createBlob(String containerName, String blobName, byte[] content) {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.upload(new ByteArrayInputStream(content), content.length);
    }

    public byte[] readBlob(String containerName, String blobName) throws IOException {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        blobClient.download(outputStream);
        return outputStream.toByteArray();
    }

    public void updateBlob(String containerName, String blobName, byte[] content) {
        deleteBlob(containerName, blobName);
        createBlob(containerName, blobName, content);
    }

    public void deleteBlob(String containerName, String blobName) {
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        BlobClient blobClient = containerClient.getBlobClient(blobName);
        blobClient.delete();
    }
}