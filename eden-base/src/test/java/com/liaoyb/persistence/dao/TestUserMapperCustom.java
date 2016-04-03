package com.liaoyb.persistence.dao;

import com.liaoyb.persistence.SpringTest;
import com.liaoyb.persistence.dao.custom.UserMapperCustom;
import com.liaoyb.persistence.domain.dto.UserDto;
import com.liaoyb.persistence.domain.vo.base.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 测试用户
 * @author ybliao2
 */
public class TestUserMapperCustom extends SpringTest {
    @Autowired
    private UserMapperCustom userMapperCustom;

    //测试用户登录
    @Test
    public void testUserLogin(){
        User user=new User();
        UserDto userDto=userMapperCustom.userLogin(user);
    }
}
