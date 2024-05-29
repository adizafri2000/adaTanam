package com.example.springbootbackend.config;

import org.postgresql.geometric.PGpoint;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PointConverter implements AttributeConverter<PGpoint, String> {

    @Override
    public String convertToDatabaseColumn(PGpoint attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.toString();
    }

    @Override
    public PGpoint convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        String[] coordinates = dbData.replace("(", "").replace(")", "").split(",");
        return new PGpoint(Double.parseDouble(coordinates[0]), Double.parseDouble(coordinates[1]));
    }
}