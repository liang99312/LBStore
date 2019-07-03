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

import com.lb.lbstore.domain.XuQiu;
import com.lb.lbstore.service.XuQiuService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/xuQiu")
public class XuQiuController extends BaseController {

    @Resource
    private XuQiuService xuQiuServiceImpl;

    @RequestMapping("goXuQiu.do")
    public String goXuQiu() {
        if (!existsUser()) {
            return "../index";
        }
        return "xiangMu/xuQiu/xuQiu";
    }

    @RequestMapping(value = "getAllXuQius.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllXuQius() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<XuQiu> xuQiuList = new ArrayList<XuQiu>();
            xuQiuList = xuQiuServiceImpl.getAllXuQius(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", xuQiuList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveXuQiu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveXuQiu(@RequestBody XuQiu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            model.setState(0);
            model.setCjr_id(getDlA01().getId());
            if(xuQiuServiceImpl.existXuQiu(model.getQy_id(), -1, model.getMc(), model.getKh_id())){
                map.put("result", -1);
                map.put("msg", "物资类别名称已存在");
            }else{
                model.setState(0);
                XuQiu xuQiu = xuQiuServiceImpl.saveXuQiu(model);
                map.put("result", 0);
                map.put("xuQiu", xuQiu);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateXuQiu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateXuQiu(@RequestBody XuQiu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(xuQiuServiceImpl.existXuQiu(model.getQy_id(), model.getId(), model.getMc(), model.getKh_id())){
                map.put("result", -1);
                map.put("msg", "物资类别名称已存在");
            }else{
                boolean result = xuQiuServiceImpl.updateXuQiu(model);
                map.put("result", result? 0:-1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteXuQiu.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteXuQiu(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = xuQiuServiceImpl.deleteXuQiu(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getXuQiuById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getXuQiuById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            XuQiu xuQiu = xuQiuServiceImpl.getXuQiuById(id);
            map.put("result", 0);
            map.put("xuQiu", xuQiu);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listXuQiusByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.xuQiuServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.xuQiuServiceImpl.queryXuQiusByPage(map));
        return model;
    }

}
