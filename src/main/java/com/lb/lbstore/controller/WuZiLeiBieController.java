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

import com.lb.lbstore.domain.WuZiLeiBie;
import com.lb.lbstore.service.WuZiLeiBieService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/wuZiLeiBie")
public class WuZiLeiBieController extends BaseController {

    @Resource
    private WuZiLeiBieService wuZiLeiBieServiceImpl;

    @RequestMapping("goWuZiLeiBie.do")
    public String goWuZiLeiBie() {
        if (!existsUser()) {
            return "../index";
        }
        return "wuZiLeiBie/wuZiLeiBie";
    }

    @RequestMapping(value = "getAllWuZiLeiBies.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllWuZiLeiBies() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<WuZiLeiBie> wuZiLeiBieList = new ArrayList<WuZiLeiBie>();
            wuZiLeiBieList = wuZiLeiBieServiceImpl.getAllWuZiLeiBies();
            map.put("result", 0);
            map.put("sz", wuZiLeiBieList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveWuZiLeiBie.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveWuZiLeiBie(@RequestBody WuZiLeiBie model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setState(0);
            WuZiLeiBie wuZiLeiBie = wuZiLeiBieServiceImpl.saveWuZiLeiBie(model);
            map.put("result", 0);
            map.put("wuZiLeiBie", wuZiLeiBie);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateWuZiLeiBie.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateWuZiLeiBie(@RequestBody WuZiLeiBie model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = wuZiLeiBieServiceImpl.updateWuZiLeiBie(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteWuZiLeiBie.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteWuZiLeiBie(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = wuZiLeiBieServiceImpl.deleteWuZiLeiBie(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getWuZiLeiBieById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getWuZiLeiBieById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            WuZiLeiBie wuZiLeiBie = wuZiLeiBieServiceImpl.getWuZiLeiBieById(id);
            map.put("result", 0);
            map.put("wuZiLeiBie", wuZiLeiBie);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listWuZiLeiBiesByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        if (model.getRows() == 0) {
            model.setRows(this.wuZiLeiBieServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.wuZiLeiBieServiceImpl.queryWuZiLeiBiesByPage(map));
        return model;
    }

}
