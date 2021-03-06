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

import com.lb.lbstore.domain.BuMen;
import com.lb.lbstore.service.BuMenService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/buMen")
public class BuMenController extends BaseController {

    @Resource
    private BuMenService buMenServiceImpl;

    @RequestMapping("goBuMen.do")
    public String goBuMen() {
        if (!existsUser()) {
            return "../index";
        }
        return "zuZhi/buMen/buMen";
    }

    @RequestMapping(value = "getAllBuMens.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllBuMens() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<BuMen> buMenList = new ArrayList<BuMen>();
            buMenList = buMenServiceImpl.getAllBuMens(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", buMenList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveBuMen.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveBuMen(@RequestBody BuMen model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            if(buMenServiceImpl.existBuMen(model.getQy_id(), -1, model.getMc())){
                map.put("result", -1);
                map.put("msg", "部门名称已存在");
            }else{
                model.setState(0);
                BuMen buMen = buMenServiceImpl.saveBuMen(model);
                map.put("result", 0);
                map.put("buMen", buMen);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateBuMen.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateBuMen(@RequestBody BuMen model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(buMenServiceImpl.existBuMen(model.getQy_id(), model.getId(), model.getMc())){
                map.put("result", -1);
                map.put("msg", "部门名称已存在");
            }else{
                boolean result = buMenServiceImpl.updateBuMen(model);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteBuMen.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteBuMen(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = buMenServiceImpl.deleteBuMen(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getBuMenById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getBuMenById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            BuMen buMen = buMenServiceImpl.getBuMenById(id);
            map.put("result", 0);
            map.put("buMen", buMen);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listBuMensByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.buMenServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.buMenServiceImpl.queryBuMensByPage(map));
        return model;
    }

}
