/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.lb.lbstore.domain.Page;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.service.A01Service;
import com.lb.lbstore.util.DataUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/a01")
public class A01Controller extends BaseController {

    @Resource
    private A01Service a01ServiceImpl;

    @RequestMapping("goA01.do")
    public String goFangJian() {
        if (!existsUser()) {
            return "../index";
        }
        return "a01/a01";
    }

    @RequestMapping(value = "getAllA01s.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllA01s() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<A01> a01List = new ArrayList<A01>();
            a01List.addAll(DataUtil.a01s);
            if (a01List.isEmpty()) {
                DataUtil.getA01sFromDb();
                a01List.addAll(DataUtil.a01s);
            }
            map.put("result", 0);
            map.put("sz", a01List);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getQx.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getQx() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            String qxStr = "";
            if (isSuperUser()) {
                qxStr += "100100,200100,200200,200300,300100,300200,300300,300400,300500,300600,300700,300800,300900,400100,500100,600100,700100,700200,800100,900100";
            } else {
                Object obj = getDlA01();
                if (obj != null) {
                    A01 a01 = (A01) obj;
                    String tempStr = a01.getA01qx();
                    if (tempStr != null && !"".equals(tempStr)) {
                        String[] tempStrs = tempStr.split("@");
                        for (String s : tempStrs) {
                            if (s != null && !"".equals(s)) {
                                int i = Integer.parseInt(s);
                                qxStr += "," + i;
                            }
                        }
                        if (qxStr.length() > 0) {
                            qxStr = qxStr.substring(1);
                        }
                    }
                }
            }
            map.put("result", 0);
            map.put("qx", qxStr);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveA01.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveA01(@RequestBody A01 model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            A01 a01 = a01ServiceImpl.saveA01(model);
            map.put("result", 0);
            map.put("a01", a01);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateA01.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateA01(@RequestBody A01 model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = a01ServiceImpl.updateA01(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteA01.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteA01(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = a01ServiceImpl.deleteA01(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "changePassword.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> changePassword(@RequestParam String oldPassword,@RequestParam String newPassword) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            A01 a01 = getDlA01();
            if (!a01.getPassword().equals(oldPassword)) {
                map.put("result", -1);
                map.put("msg", "原密码错误！");
            }else{
                boolean result = a01ServiceImpl.changePassword(a01.getId(), newPassword);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getA01ById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getA01ById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            A01 a01 = a01ServiceImpl.getA01ById(id);
            map.put("result", 0);
            map.put("a01", a01);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listA01sByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        if (model.getRows() == 0) {
            model.setRows(this.a01ServiceImpl.queryRows(map));//查询记录数
        }
        if (model.getRows() == 0) {
            model.setCurrentPage(1);
            model.setList(new ArrayList());
            model.setParamters(new HashMap());
            model.setRows(0);
            model.setTotalPage(0);
            return model;
        }
        if (model.getTotalPage() == 0) {
            model.setTotalPage(model.calcTotalPage());
        }
        map.put("beginRow", model.getBegin());
        map.put("pageSize", model.getPageSize());
        model.setList(this.a01ServiceImpl.queryA01sByPage(map));
        return model;
    }

}
