package com.liaoyb.persistence.service;

import com.liaoyb.persistence.domain.vo.base.Myfile;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件的上传与下载
 * @author ybliao2
 */
public interface FileService {

    /**
     * 上传,把文件放到上传路径中，插入记录
     *
     * @param fileUpload
     * @return
     */
    Myfile upload(MultipartFile fileUpload);



    /**
     * 获得myFile
     * @param fileId
     * @return
     */
    Myfile findFileById(Long fileId);
}
