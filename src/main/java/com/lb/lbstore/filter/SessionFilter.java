/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.filter;

import java.io.IOException;  
import java.io.PrintWriter;  
  
import javax.servlet.FilterChain;  
import javax.servlet.ServletException;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
import org.springframework.web.filter.OncePerRequestFilter;  
  
/** 
 * 登录过滤 
 *  
 */  
public class SessionFilter extends OncePerRequestFilter {  
    @Override  
    protected void doFilterInternal(HttpServletRequest request,  
            HttpServletResponse response, FilterChain filterChain)  
            throws ServletException, IOException {  
  
        // 不拦截的url  
        String[] notFilter = new String[] {"/index.html","login"};  
  
        // 请求的url  
        String url = request.getRequestURI();  
        System.out.println("url=" + url);
        if(url.contains("LbmHotel")){  
            boolean doFilter = chek(notFilter,url);  
            if(doFilter){  
                Object obj = request.getSession().getAttribute("a01");  
                if(null==obj){  
                    // 如果session中不存在登录者实体，则弹出框提示重新登录  
                    PrintWriter out = response.getWriter();  
                    String loginPage = request.getContextPath()+"/index.html";
                    StringBuilder builder = new StringBuilder();  
                    builder.append("<script type=\"text/javascript\">");  
                    builder.append("window.top.location.href='");  
                    builder.append(loginPage);  
                    builder.append("';");  
                    builder.append("</script>");  
                    out.print(builder.toString());  
                }else {  
                    filterChain.doFilter(request, response);  
                }  
            }else{  
                filterChain.doFilter(request, response);  
            }  
        }else{  
            filterChain.doFilter(request, response);  
        }  
    }  
      
    /** 
     * @param notFilter 不拦截的url 
     * @param url ：请求的url 
     * @return false：不拦截 
     *         true：拦截 
     */  
    public boolean chek(String[] notFilter,String url){  
        //url以css和js结尾的不进行拦截  
        if(url.endsWith(".css") || url.endsWith(".js") || url.endsWith(".jpg")){  
            return false;  
        }  
        //含有notFilter中的任何一个则不进行拦截  
        for (String s : notFilter) {  
            if (url.contains(s)) {
                return false;  
            }  
        }  
        return true;  
    }  
  
}  