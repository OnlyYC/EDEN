package com.liaoyb.persistence.serviceImpl;

import com.liaoyb.base.annotation.PageAnnotation;
import com.liaoyb.base.domain.Page;
import com.liaoyb.persistence.dao.base.CommentMapper;
import com.liaoyb.persistence.dao.custom.CommentMapperCustom;
import com.liaoyb.persistence.domain.vo.base.Comment;
import com.liaoyb.persistence.domain.vo.custom.CommentCustom;
import com.liaoyb.persistence.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * 评论服务
 * @author ybliao2
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapperCustom commentMapperCustom;
    @Autowired
    private CommentMapper commentMapper;

    /**
     * 评论,type类型区分是歌曲还是歌单的评论,分页
     * @param page 分页
     * @param belongId 所属id
     * @param type 评论类型
     * @return 评论分页数据
     */
    @Override
    @PageAnnotation
    public Page<CommentCustom> findCommentCustomsPage(Page<CommentCustom> page, Long belongId, Long type) {
        List<CommentCustom>commentCustoms= commentMapperCustom.findCommentCustoms(belongId,type);
        page.setResult(commentCustoms);
        return page;
    }


    /**
     * 用户添加评论,也可以是回复
     * @param comment 评论
     */
    @Override
    @Transactional
    public void addUserComment(Comment comment) {
        comment.setAddDate(new Date().getTime());
        comment.setPraiseCount(0L);
        commentMapper.insertSelective(comment);
    }

    /**
     * 赞评论
     * @param commentId 评论id
     */
    @Override
    public void praiseComment(Long commentId) {
        //先找到原评论
        Comment oldComment=commentMapper.selectByPrimaryKey(commentId);
        oldComment.setPraiseCount(oldComment.getPraiseCount()+1);
        commentMapper.updateByPrimaryKeySelective(oldComment);

    }


}
