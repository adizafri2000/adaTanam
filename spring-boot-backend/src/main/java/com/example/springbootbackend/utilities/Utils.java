package com.example.springbootbackend.utilities;

import java.sql.Timestamp;

/**
 * Random utility functions
 */
public class Utils {
    public static Timestamp setCurrentTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }


}
