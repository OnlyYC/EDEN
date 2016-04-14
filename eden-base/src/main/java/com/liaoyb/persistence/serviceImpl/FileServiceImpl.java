package com.liaoyb.persistence.serviceImpl;

import com.liaoyb.persistence.dao.base.MyfileMapper;
import com.liaoyb.persistence.domain.vo.base.Myfile;
import com.liaoyb.persistence.service.FileService;
import com.liaoyb.util.SpringContextUtil;
import com.liaoyb.util.UUIDUtil;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/**
 * @author ybliao2
 */
@Service
public class FileServiceImpl implements FileService {
    @Autowired
    private MyfileMapper myfileMapper;

    /**
     * 上传,把文件放到上传路径中，插入记录
     *
     * @param fileUpload
     * @return
     */
    @Override
    @Transactional
    public Myfile upload(MultipartFile fileUpload) {
        String contentType=fileUpload.getContentType();
        Myfile myfile=new Myfile();
        String saveBasePath=null;
        String baseUrl=null;
        //图片
        if(contentType.indexOf("image")>0){
            saveBasePath= (String) SpringContextUtil.getBean("uploadImagePath");
            baseUrl=(String)SpringContextUtil.getBean("imageUrl");

        }

        //音乐
        if(contentType.indexOf("video")>0){
            saveBasePath=(String) SpringContextUtil.getBean("uploadMusicPath");
            baseUrl=(String)SpringContextUtil.getBean("imageUrl");
        }

        //视频
        if(contentType.indexOf("video")>0){
            saveBasePath=(String) SpringContextUtil.getBean("uploadVideoPath");
            baseUrl=(String)SpringContextUtil.getBean("videoUrl");
        }

        //文件名
        String fileName= UUIDUtil.getRandomStr()+fileUpload.getOriginalFilename().substring(fileUpload.getOriginalFilename().lastIndexOf("."));

        myfile.setLocation(saveBasePath+"/"+fileName);
        myfile.setUrl(baseUrl+"/"+fileName);
        myfile.setAddTime(new Date().getTime());
        myfile.setFileSize(fileUpload.getSize());


        try {
            FileUtils.writeByteArrayToFile(new File(myfile.getLocation()),fileUpload.getBytes());
            //插入
            myfileMapper.insertSelective(myfile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return myfile;
    }


    /**
     * 获得myFile
     * @param fileId
     * @return
     */
    @Override
    public Myfile findFileById(Long fileId) {
        return myfileMapper.selectByPrimaryKey(fileId);
    }
}
