/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.lb.lbstore.domain.A01;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 *
 * @author Administrator
 */
public class BaseController {

    public HttpServletRequest request;
    public HttpServletResponse response;

    public void setServletRequest(HttpServletRequest arg0) {
        this.request = arg0;
    }

    public void setServletResponse(HttpServletResponse arg0) {
        this.response = arg0;
    }
    
    @ModelAttribute     
    public void getRequestResponse(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;         
        this.response = response;     
    }

    public boolean existsUser() {
        boolean result = false;
        HttpSession session = request.getSession();
        Object loginUser = session.getAttribute("a01");
        if (loginUser != null) {
            result = true;
        }
        return result;
    }
    
    public Map<String, Object> notLoginResult(){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("result", -1);
        map.put("msg", "未登陆系统");
        return map;
    }

    public A01 getDlA01() {
        HttpSession session = request.getSession();
        return (A01) session.getAttribute("a01");

    }

    public String getUserName() {
        String result = "";
        HttpSession session = request.getSession();
        Object loginUser = session.getAttribute("a01");
        if (loginUser != null && !"".equals(((A01) loginUser).getBh())) {
            result = ((A01) loginUser).getBh();
        }
        return result;
    }

    public boolean isSuperUser() {
        return "sa".equals(getUserName());
    }

    public void renderJson(String jsonString) throws IOException {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.write(jsonString);
        out.close();
    }
}
