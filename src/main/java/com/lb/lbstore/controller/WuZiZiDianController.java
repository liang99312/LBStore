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
            if(wuZiZiDianServiceImpl.existWuZiZiDian(model.getQy_id(), -1, model.getMc(), model.getBm())){
                map.put("result", -1);
                map.put("msg", "物资字典名称或编码已存在");
            }else{
                model.setState(0);
                WuZiZiDian wuZiZiDian = wuZiZiDianServiceImpl.saveWuZiZiDian(model);
                map.put("result", 0);
                map.put("wuZiZiDian", wuZiZiDian);
            }
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
            if(wuZiZiDianServiceImpl.existWuZiZiDian(model.getQy_id(), model.getId(), model.getMc(), model.getBm())){
                map.put("result", -1);
                map.put("msg", "物资字典名称已存在");
            }else{
                boolean result = wuZiZiDianServiceImpl.updateWuZiZiDian(model);
                map.put("result", result? 0:-1);
            }
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
    
    @RequestMapping(value = "getWuZiZiDianByWzlbId.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getWuZiZiDianByWzlbId(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<WuZiZiDian> wuZiZiDian_list = wuZiZiDianServiceImpl.getWuZiZiDianByWzlbId(id);
            map.put("result", 0);
            map.put("sz", wuZiZiDian_list);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "calcXhggSL.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> calcXhggSL(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            HashMap parameters = new HashMap<String, Object>();
            parameters.put("qy_id", getDlA01().getQy_id());
            parameters.put("wzzd_id", id);
            boolean result = wuZiZiDianServiceImpl.calcXhggSL(parameters);
            map.put("result", result? 0:-1);
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
