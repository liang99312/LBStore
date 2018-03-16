package com.lb.lbstore.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ApplicationUtil implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    public static Object getBean(String name) {
        return applicationContext.getBean(name);
    }

    public void setApplicationContext(ApplicationContext arg0)
            throws BeansException {
        ApplicationUtil.applicationContext = arg0;

    }
}
