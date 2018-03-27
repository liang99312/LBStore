/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.util;

import java.io.File;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author DengFeng
 */
public class FileUtil {

    public static boolean saveFile(MultipartFile file,String path) {
        // 判断文件是否为空  
        if (!file.isEmpty()) {
            try {
                // 文件保存路径  
                String filePath = path;
                // 转存文件  
                file.transferTo(new File(filePath));
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    
    public static boolean createFloder(String path){
        File f = new File(path);
        if(f.exists()){
            return true;
        }
        f.mkdirs();
        return true;
    }
}
