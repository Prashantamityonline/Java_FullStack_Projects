package com.prashant.api.ecom.ducart.utils;

import java.io.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUploadUtil {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadUtil.class);
    public static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    public static String getUploadDirFor(String folderName) {
        String path = BASE_UPLOAD_DIR + folderName + "/";
        File directory = new File(path);

        // Check if the directory already exists, else create it
        if (!directory.exists()) {
            boolean isCreated = directory.mkdirs();
            if (!isCreated) {
                logger.error("Could not create upload directory: " + path);
                throw new RuntimeException("Could not create upload directory: " + path);
            }
            logger.info("Created upload directory: " + path);
        }

        return path;
    }
}
