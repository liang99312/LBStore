/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.userlisten;

import java.util.Date;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author Administrator
 */
public class LsContextListener implements ServletContextListener {  
  
    public LsContextListener() {  
        // TODO Auto-generated constructor stub  
    }  
  
    public void contextInitialized(ServletContextEvent event)  {   
         // 服务器启动时被调用  
        ApplicationConstants.START_DATE = new Date();//记录启动时间  
    }  
    public void contextDestroyed(ServletContextEvent event)  {   
         // 服务器被关闭时调用  
        ApplicationConstants.START_DATE = null;//清空结果，也可以保存  
          
        ApplicationConstants.MAX_ONLINE_COUNT_DATE = null;  
    }  
      
}  