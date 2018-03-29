/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.userlisten;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.LoginUser;
import com.lb.lbstore.domain.QiYe;
import com.lb.lbstore.util.DataUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Administrator
 */
public class ApplicationConstants {

    public static Map<String, HttpSession> SESSION_MAP = new HashMap<String, HttpSession>();//索引所有的session

    public static List<LoginUser> LOGINUSERS = new ArrayList();

    public static int CURRENT_LOGIN_COUNT = 0;//当前登录的用户总数  

    public static int TOTAL_HISTORY_COUNT = 0;//历史访客总数  

    public static Date START_DATE = new Date();//服务器启动事件  

    public static Date MAX_ONLINE_COUNT_DATE = new Date();//最高在线时间  

    public static int MAX_ONLINE_COUNT = 0;//最高在线人数  

    public static void addLoginUser(A01 a01, String sessenId) {
        if (DataUtil.qiYes.isEmpty()) {
            DataUtil.getQiYesFromDb();
        }
        List<QiYe> qiYes = DataUtil.qiYes;
        QiYe qy = null;
        for (QiYe q : qiYes) {
            if (q.getId().equals(a01.getQy_id())) {
                qy = q;
                break;
            }
        }
        if (qy != null) {
            LoginUser lu = new LoginUser();
            lu.setA0105(a01.getA0105());
            lu.setA0111(a01.getA0111());
            lu.setBh(a01.getBh());
            lu.setDm(a01.getDm());
            lu.setMc(a01.getMc());
            lu.setQy(qy.getMc());
            lu.setQy_id(a01.getQy_id());
            lu.setState(a01.getState());
            lu.setId(a01.getId());
            lu.setSession_id(sessenId);
            ApplicationConstants.LOGINUSERS.add(lu);
        }
    }

    public static boolean removeLoginUser(Integer id, String sessionId) {
        boolean result = true;
        LoginUser lu = null;
        for (LoginUser l : ApplicationConstants.LOGINUSERS) {
            if (l.getId().equals(id)) {
                lu = l;
                break;
            }
        }
        if (lu != null) {
            HttpSession session = ApplicationConstants.SESSION_MAP.get(sessionId);
            if (session != null) {
                session.removeAttribute("a01");
                session.invalidate();
            }
            ApplicationConstants.LOGINUSERS.remove(lu);
        }
        return result;
    }

    public static int getLoginUserRows(int qy_id, String name) {
        int result = 0;
        if (qy_id == -1 && "".equals(name)) {
            return ApplicationConstants.LOGINUSERS.size();
        }
        for (LoginUser lu : ApplicationConstants.LOGINUSERS) {
            if (qy_id != -1) {
                if (qy_id == lu.getQy_id()) {
                    result++;
                    continue;
                }
            }
            if (!"".equals(name)) {
                if (lu.getMc().contains(name) || lu.getBh().contains(name)) {
                    result++;
                }
            }
        }
        return result;
    }

    public static List<LoginUser> getLoginUserByPage(int begin, int size, int qy_id, String name) {
        List<LoginUser> list = new ArrayList<LoginUser>();
        if (qy_id == -1 && "".equals(name)) {
            list.addAll(ApplicationConstants.LOGINUSERS);
        } else {
            for (LoginUser lu : ApplicationConstants.LOGINUSERS) {
                if (qy_id != -1) {
                    if (qy_id == lu.getQy_id()) {
                        list.add(lu);
                        continue;
                    }
                }
                if (!"".equals(name)) {
                    if (lu.getMc().contains(name) || lu.getBh().contains(name)) {
                        list.add(lu);
                    }
                }
            }
        }

        List<LoginUser> loginUser_list = new ArrayList<LoginUser>();
        int end = begin + size;
        if (end > list.size()) {
            end = list.size();
        }
        loginUser_list = list.subList(begin, end);
        return loginUser_list;
    }
}
