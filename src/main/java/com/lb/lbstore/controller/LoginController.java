/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.service.A01Service;
import com.lb.lbstore.userlisten.ApplicationConstants;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class LoginController extends BaseController {

    @Resource
    private A01Service a01ServiceImpl;
    
    @RequestMapping("goHome.do")
    public String goHome() {
        if (!existsUser()) {
            return "../index";
        }
        return "home/home";
    }
    
    @RequestMapping("goAdmin.do")
    public String goAdmin() {
        if (!existsUser()) {
            return "../admin";
        }
        return "admin/admin";
    }

    @RequestMapping(value = "login.do", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> login(@RequestParam String bh,@RequestParam String password) {
        Map<String, Object> map = new HashMap<String, Object>();
        A01 a01 = a01ServiceImpl.checkLogin(bh, password);
        if(a01 == null){
            map.put("result", -1);
            map.put("msg","用户名或密码错误！");
        }else{
            if(a01.getState() == -9){
                map.put("result", -1);
                map.put("msg","企业已停用，请联系管理员！");
            }else if(a01.getState() == -1){
                map.put("result", -1);
                map.put("msg","该用户已禁用，请联系管理员！");
            }else{
                request.getSession().setAttribute("a01", a01);
                ApplicationConstants.addLoginUser(a01, this.request.getSession().getId());
                map.put("result", 0);
                map.put("a01",a01);
                map.put("url","/goHome.do");
            }
        }
        return map;
    }

    @RequestMapping(value = "getLoginA01.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getLoginA01() {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if (!existsUser()) {
                return notLoginResult();
            }
            map.put("result", 0);
            map.put("a01", getDlA01());
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", -1);
            map.put("a01", e.getMessage());
        }
        return map;
    }

    @RequestMapping("logout.do")
    public void loadOut() {
        PrintWriter out = null;
        try {
            A01 a01 = (A01) request.getSession().getAttribute("a01");
            if(a01 != null){
                ApplicationConstants.removeLoginUser(a01.getId(), request.getSession().getId());
                request.getSession().removeAttribute("a01");
            }
            out = response.getWriter();
            String loginPage = request.getContextPath() + "/index.html";
            StringBuilder builder = new StringBuilder();
            builder.append("<script type=\"text/javascript\">");
            builder.append("window.top.location.href='");
            builder.append(loginPage);
            builder.append("';");
            builder.append("</script>");
            out.print(builder.toString());
        } catch (IOException ex) {
            Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if(out != null)
                out.close();
        }
    }
    
    @RequestMapping(value = "login_admin.do", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> login_admin(@RequestParam String bh,@RequestParam String password) {
        Map<String, Object> map = new HashMap<String, Object>();
        A01 a01 = a01ServiceImpl.checkLogin(bh, password);
        if(a01 == null){
            map.put("result", -1);
            map.put("msg","用户名或密码错误！");
        } else if(a01.getState() != 9){
            map.put("result", -1);
            map.put("msg","用户不对！");
        }else{
            request.getSession().setAttribute("a01", a01);
            map.put("result", 0);
            map.put("a01",a01);
        }
        return map;
    }
    
    @RequestMapping("logout_admin.do")
    public void logout_admin() {
        PrintWriter out = null;
        try {
            request.getSession().removeAttribute("a01");
            out = response.getWriter();
            String loginPage = request.getContextPath() + "/admin.html";
            StringBuilder builder = new StringBuilder();
            builder.append("<script type=\"text/javascript\">");
            builder.append("window.top.location.href='");
            builder.append(loginPage);
            builder.append("';");
            builder.append("</script>");
            out.print(builder.toString());
        } catch (IOException ex) {
            Logger.getLogger(LoginController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

}
