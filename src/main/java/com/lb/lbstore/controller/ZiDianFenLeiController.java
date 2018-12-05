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

import com.lb.lbstore.domain.ZiDianFenLei;
import com.lb.lbstore.service.ZiDianFenLeiService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/ziDianFenLei")
public class ZiDianFenLeiController extends BaseController {

    @Resource
    private ZiDianFenLeiService ziDianFenLeiServiceImpl;

    @RequestMapping("goZiDianFenLei.do")
    public String goZiDianFenLei() {
        if (!existsUser()) {
            return "../index";
        }
        return "ziDian/ziDianFenLei/ziDianFenLei";
    }

    @RequestMapping(value = "getAllZiDianFenLeis.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllZiDianFenLeis() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<ZiDianFenLei> ziDianFenLeiList = new ArrayList<ZiDianFenLei>();
            ziDianFenLeiList = ziDianFenLeiServiceImpl.getAllZiDianFenLeis(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", ziDianFenLeiList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveZiDianFenLei.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveZiDianFenLei(@RequestBody ZiDianFenLei model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            if(ziDianFenLeiServiceImpl.existZiDianFenLei(model.getQy_id(), -1, model.getMc())){
                map.put("result", -1);
                map.put("msg", "字典分类名称已存在");
            }else{
                ZiDianFenLei ziDianFenLei = ziDianFenLeiServiceImpl.saveZiDianFenLei(model);
                map.put("result", 0);
                map.put("ziDianFenLei", ziDianFenLei);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateZiDianFenLei.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateZiDianFenLei(@RequestBody ZiDianFenLei model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(ziDianFenLeiServiceImpl.existZiDianFenLei(model.getQy_id(), model.getId(), model.getMc())){
                map.put("result", -1);
                map.put("msg", "字典分类名称已存在");
            }else{
                boolean result = ziDianFenLeiServiceImpl.updateZiDianFenLei(model);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteZiDianFenLei.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteZiDianFenLei(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = ziDianFenLeiServiceImpl.deleteZiDianFenLei(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getZiDianFenLeiById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getZiDianFenLeiById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            ZiDianFenLei ziDianFenLei = ziDianFenLeiServiceImpl.getZiDianFenLeiById(id);
            map.put("result", 0);
            map.put("ziDianFenLei", ziDianFenLei);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listZiDianFenLeisByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.ziDianFenLeiServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.ziDianFenLeiServiceImpl.queryZiDianFenLeisByPage(map));
        return model;
    }

}
