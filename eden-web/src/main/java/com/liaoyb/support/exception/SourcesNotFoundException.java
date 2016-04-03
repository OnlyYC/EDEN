package com.liaoyb.support.exception;

/**
 * 资源未找到异常
 * @author ybliao2
 */
public class SourcesNotFoundException extends CustomException {
    public SourcesNotFoundException() {
        super("sources not found");
    }

}
