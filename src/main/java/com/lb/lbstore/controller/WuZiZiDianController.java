/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.lb.lbstore.domain.Page;
import com.lb.lbstore.domain.WuZiLeiBie;
import com.lb.lbstore.domain.WuZiXhgg;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.service.WuZiLeiBieService;
import com.lb.lbstore.service.WuZiXhggService;
import com.lb.lbstore.service.WuZiZiDianService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/wuZiZiDian")
public class WuZiZiDianController extends BaseController {

    @Resource
    private WuZiZiDianService wuZiZiDianServiceImpl;
    @Resource
    private WuZiXhggService wuZiXhggServiceImpl;
    @Resource
    private WuZiLeiBieService wuZiLeiBieServiceImpl;

    @RequestMapping("goWuZiZiDian.do")
    public String goWuZiZiDian() {
        if (!existsUser()) {
            return "../index";
        }
        return "cangKu/wuZiZiDian/wuZiZiDian";
    }

    @RequestMapping(value = "getAllWuZiZiDians.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllWuZiZiDians() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<WuZiZiDian> wuZiZiDianList = new ArrayList<WuZiZiDian>();
            wuZiZiDianList = wuZiZiDianServiceImpl.getAllWuZiZiDians(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", wuZiZiDianList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveWuZiZiDian.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveWuZiZiDian(@RequestBody WuZiZiDian model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            model.setState(0);
            WuZiZiDian wuZiZiDian = wuZiZiDianServiceImpl.saveWuZiZiDian(model);
            map.put("result", 0);
            map.put("wuZiZiDian", wuZiZiDian);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateWuZiZiDian.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateWuZiZiDian(@RequestBody WuZiZiDian model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = wuZiZiDianServiceImpl.updateWuZiZiDian(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteWuZiZiDian.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteWuZiZiDian(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = wuZiZiDianServiceImpl.deleteWuZiZiDian(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getWuZiZiDianById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getWuZiZiDianById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            WuZiZiDian wuZiZiDian = wuZiZiDianServiceImpl.getWuZiZiDianById(id);
            List<WuZiXhgg> list = wuZiXhggServiceImpl.getWuZiXhgg4zd(id);
            WuZiLeiBie wzlb = wuZiLeiBieServiceImpl.getWuZiLeiBieById(wuZiZiDian.getWzlb_id());
            wuZiZiDian.setWzlb(wzlb);
            wuZiZiDian.setXhggs(list);
            map.put("result", 0);
            map.put("wuZiZiDian", wuZiZiDian);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listWuZiZiDiansByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.wuZiZiDianServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.wuZiZiDianServiceImpl.queryWuZiZiDiansByPage(map));
        return model;
    }

}
