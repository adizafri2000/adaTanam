package com.example.springbootbackend.config;

import org.postgresql.geometric.PGpoint;
import org.springframework.data.geo.Point;

import jakarta.persistence.Converter;
import jakarta.persistence.AttributeConverter;

@Converter(autoApply = true)
public class PointConverter implements AttributeConverter<Point, PGpoint> {

    @Override
    public PGpoint convertToDatabaseColumn(Point attribute) {
        if (attribute == null) {
            return null;
        }
        return new PGpoint(attribute.getX(), attribute.getY());
    }

    @Override
    public Point convertToEntityAttribute(PGpoint dbData) {
        if (dbData == null) {
            return null;
        }
        return new Point(dbData.x, dbData.y);
    }
}
