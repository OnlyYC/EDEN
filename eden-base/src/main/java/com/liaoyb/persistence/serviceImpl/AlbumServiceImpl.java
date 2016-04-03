package com.liaoyb.persistence.serviceImpl;

import com.liaoyb.base.annotation.PageAnnotation;
import com.liaoyb.base.domain.Page;
import com.liaoyb.persistence.dao.base.AlbumMapper;
import com.liaoyb.persistence.dao.custom.SongMapperCustom;
import com.liaoyb.persistence.domain.dto.SongDto;
import com.liaoyb.persistence.domain.vo.base.Album;
import com.liaoyb.persistence.domain.vo.custom.SongCustom;
import com.liaoyb.persistence.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 专辑Service
 * @author ybliao2
 */
@Service
public class AlbumServiceImpl implements AlbumService{

    @Autowired
    private AlbumMapper albumMapper;
    @Autowired
    private SongMapperCustom songMapperCustom;

    /**
     * 通过id找到专辑
     * @param albumId
     * @return
     */
    @Override
    public Album findAlbumById(Long albumId) {
        return albumMapper.selectByPrimaryKey(albumId);
    }

    /**
     * 专辑中音乐,分页
     * @param page
     * @param albumId
     * @param userId
     * @return
     */
    @Override
    @PageAnnotation
    public Page<SongDto> findSongDtoInAlbum(Page<SongDto> page, Long albumId, Long userId) {
        List<SongDto>songDtos=songMapperCustom.findSongDtoInAlbum(albumId,userId);
        page.setResult(songDtos);
        return page;
    }


    /**
     * 专辑中的音乐，不使用分页
     * @param albumId
     * @return
     */
    @Override
    public List<SongCustom> findSongCustomInAlbum(Long albumId) {
        return songMapperCustom.findSongCustomsInAlbum(albumId);
    }


}
