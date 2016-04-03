package com.liaoyb.web.api;

import com.liaoyb.persistence.domain.vo.base.Song;
import com.liaoyb.support.utils.MyResultUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 测试用的控制器
 *
 * @author liao
 * @create 2016-02-01-16:52
 **/
@Controller
@RequestMapping("/test")
public class TestController {

    @RequestMapping("/sendMap")
    public void testsendMap(HttpServletResponse response){
        Map map=new HashMap<>();
        map.put("test1","GG");
        List<Song>songs=new ArrayList<>();
        Song song=new Song();
        song.setId(1L);
        song.setName("测试歌曲");
        song.setSongFileId(2L);
        song.setSongUrl("/sources/mp3/11.mp3");
        song.setCoverUrl("/sources/images/22.jpg");
        songs.add(song);
        map.put("test2",songs);
        MyResultUtil.sendMap(response,map);
    }

    @RequestMapping("/testView")
    public String testView(){
        return "test";
    }
}
