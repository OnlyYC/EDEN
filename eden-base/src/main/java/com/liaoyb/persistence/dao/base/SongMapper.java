package com.liaoyb.persistence.dao.base;

import com.liaoyb.persistence.domain.vo.base.Song;
import com.liaoyb.persistence.domain.vo.base.SongExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SongMapper {
    int countByExample(SongExample example);

    int deleteByExample(SongExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Song record);

    int insertSelective(Song record);

    List<Song> selectByExample(SongExample example);

    Song selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Song record, @Param("example") SongExample example);

    int updateByExample(@Param("record") Song record, @Param("example") SongExample example);

    int updateByPrimaryKeySelective(Song record);

    int updateByPrimaryKey(Song record);
}