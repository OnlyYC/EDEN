package com.liaoyb.support.exception;

/**
 * 权限不足异常
 * @author ybliao2
 */
public class PermissionDeniedException extends CustomException {
    public PermissionDeniedException() {
        super("Permission Denied");
    }
}
