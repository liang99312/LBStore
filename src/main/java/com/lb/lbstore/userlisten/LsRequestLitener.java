/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.userlisten;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Administrator
 */
public class LsRequestLitener implements ServletRequestListener {

    public LsRequestLitener() {
        // TODO Auto-generated constructor stub  
    }

    public void requestDestroyed(ServletRequestEvent arg0) {
        // TODO Auto-generated method stub  
    }

    public void requestInitialized(ServletRequestEvent event) {
        // 创建request时被调用  
        HttpServletRequest request = (HttpServletRequest) event.getServletRequest();
        HttpSession session = request.getSession(true);//对应的session  
        session.setAttribute("ip", request.getRemoteAddr());//记录ip地址  

        String uri = request.getRequestURI();
        String[] suffix = {".html", ".do", ".action"};//指定后缀  

        for (int i = 0; i < suffix.length; i++) {
            if (uri.endsWith(suffix[i])) {
                break;//程序继续运行  
            }
            if (i == suffix.length - 1) {
                return;//否则返回  
            }

        }
        Integer activeTimes = (Integer) session.getAttribute("activeTime");
        if (activeTimes == null) {
            activeTimes = 0;
        }
        session.setAttribute("activeTimes", activeTimes + 1);//更新访问次数  
    }

}
