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

import com.lb.lbstore.domain.QiYe;
import com.lb.lbstore.service.QiYeService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/qiYe")
public class QiYeController extends BaseController {

    @Resource
    private QiYeService qiYeServiceImpl;

    @RequestMapping("goQiYe.do")
    public String goQiYe() {
        if (!existsUser()) {
            return "../index";
        }
        return "qiYe/qiYe";
    }

    @RequestMapping(value = "getAllQiYes.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllQiYes() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<QiYe> qiYeList = new ArrayList<QiYe>();
            qiYeList = qiYeServiceImpl.getAllQiYes();
            map.put("result", 0);
            map.put("sz", qiYeList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveQiYe.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveQiYe(@RequestBody QiYe model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(qiYeServiceImpl.existQiYe(-1, model.getMc())){
                map.put("result", -1);
                map.put("msg", "企业名称已存在");
            }else{
                model.setState(0);
                QiYe qiYe = qiYeServiceImpl.saveQiYe(model);
                map.put("result", 0);
                map.put("qiYe", qiYe);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateQiYe.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateQiYe(@RequestBody QiYe model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(qiYeServiceImpl.existQiYe(model.getId(), model.getMc())){
                map.put("result", -1);
                map.put("msg", "企业名称已存在");
            }else{
                boolean result = qiYeServiceImpl.updateQiYe(model);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteQiYe.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteQiYe(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = qiYeServiceImpl.deleteQiYe(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "recoverQiYe.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> recoverQiYe(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = qiYeServiceImpl.recoverQiYe(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getQiYeById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getQiYeById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            QiYe qiYe = qiYeServiceImpl.getQiYeById(id);
            map.put("result", 0);
            map.put("qiYe", qiYe);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listQiYesByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        if (model.getRows() == 0) {
            model.setRows(this.qiYeServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.qiYeServiceImpl.queryQiYesByPage(map));
        return model;
    }

}
