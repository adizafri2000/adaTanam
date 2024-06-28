package com.example.springbootbackend.dto.order;

import java.sql.Timestamp;

public record OrderRequestDTO(
        Integer account,
        Integer store,
        Integer cart,
        Timestamp orderTimestamp,
        Timestamp pickup,
        Boolean isCompleted,
        Timestamp completedTimestamp,
        String status
) {

}
