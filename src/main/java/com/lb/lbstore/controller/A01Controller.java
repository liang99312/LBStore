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
    public String goA01() {
        if (!existsUser()) {
            return "../index";
        }
        return "zuZhi/a01/a01";
    }
    
    @RequestMapping("goPassword.do")
    public String goPassword() {
        if (!existsUser()) {
            return "../index";
        }
        return "system/password";
    }

    @RequestMapping(value = "getAllA01s.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllA01s() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            int qy_id = getDlA01().getQy_id();
            List<A01> a01List = a01ServiceImpl.getQyAllA01s(qy_id);
            map.put("result", 0);
            map.put("sz", a01List);
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
            model.setQy_id(getDlA01().getQy_id());
            if(a01ServiceImpl.existA01(model.getQy_id(), -1, model.getMc(), model.getBh())){
                map.put("result", -1);
                map.put("msg", "姓名或者编号已存在");
            }else{
                A01 a01 = a01ServiceImpl.saveA01(model);
                map.put("result", 0);
                map.put("a01", a01);
            }
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
            if(a01ServiceImpl.existA01(model.getQy_id(), model.getId(), model.getMc(), model.getBh())){
                map.put("result", -1);
                map.put("msg", "姓名或者编号已存在");
            }else{
                boolean result = a01ServiceImpl.updateA01(model);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "updateA01Qx.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateA01Qx(@RequestBody A01 model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = a01ServiceImpl.updateA01Qx(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteA01.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
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
    
    @RequestMapping(value = "changePassword.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
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

    @RequestMapping(value = "getA01ById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
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
        map.put("qy_id", getDlA01().getQy_id());
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
