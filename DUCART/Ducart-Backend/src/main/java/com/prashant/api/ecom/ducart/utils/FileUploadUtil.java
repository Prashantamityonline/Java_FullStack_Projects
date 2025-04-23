package com.prashant.api.ecom.ducart.utils;

import java.io.File;

public class FileUploadUtil {

    public static final String BASE_UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    public static String getUploadDirFor(String folderName) {
        String path = BASE_UPLOAD_DIR + folderName + "/";
        File directory = new File(path);
        if (!directory.exists() && !directory.mkdirs()) {
            throw new RuntimeException("Could not create upload directory: " + path);
        }
        return path;
    }
}
