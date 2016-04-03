package com.liaoyb.web.api;

import com.liaoyb.base.domain.Page;
import com.liaoyb.persistence.domain.vo.custom.CommentCustom;
import com.liaoyb.persistence.service.CommentService;
import com.liaoyb.support.utils.MyResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

/**
 * 评论
 * @author ybliao2
 */
@Controller
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    /**
     * 查找评论,type区分类型
     * @param response
     * @param page
     * @param belongId
     * @param type
     */
    @RequestMapping("/findComments")
    public void findComments(HttpServletResponse response, Page<CommentCustom> page, Long belongId, Long type){
        page=commentService.findCommentCustomsPage(page,belongId,type);
        MyResultUtil.sendPage(response,page);
    }
}
