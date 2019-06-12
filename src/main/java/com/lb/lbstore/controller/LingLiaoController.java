/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.Page;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lb.lbstore.domain.LingLiao;
import com.lb.lbstore.domain.LingLiaoDetail;
import com.lb.lbstore.service.LingLiaoService;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/lingLiao")
public class LingLiaoController extends BaseController {

    @Resource
    private LingLiaoService lingLiaoServiceImpl;

    @RequestMapping("goLingLiao.do")
    public String goLingLiao() {
        if (!existsUser()) {
            return "../index";
        }
        return "cangKu/lingLiao/lingLiao";
    }

    @RequestMapping(value = "saveLingLiao.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveLingLiao(@RequestBody LingLiao model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            model.setState(0);
            model.setSj(new Date());
            LingLiao lingLiao = lingLiaoServiceImpl.saveLingLiao(model);
            map.put("result", 0);
            map.put("lingLiao", lingLiao);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getLingLiaoWithDetailById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getLingLiaoWithDetailById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            LingLiao lingLiao = lingLiaoServiceImpl.getLingLiaoWithDetailById(id);
            map.put("result", 0);
            map.put("lingLiao", lingLiao);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getLingLiaoDetailById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getLingLiaoDetailById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            LingLiaoDetail lingLiaoDetail = lingLiaoServiceImpl.getLingLiaoDetailById(id);
            map.put("result", 0);
            map.put("lingLiaoDetail", lingLiaoDetail);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateLingLiao.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateLingLiao(@RequestBody LingLiao model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "已办理领料单不能修改！");
                return map;
            }
            model.setSj(new Date());
            boolean result = lingLiaoServiceImpl.updateLingLiao(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "dealLingLiao.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> dealLingLiao(@RequestBody LingLiao model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "领料单已办理！");
                return map;
            }
            boolean result = lingLiaoServiceImpl.dealLingLiao(model,getDlA01().getId());
            map.put("result", result? 0:-1);
            map.put("msg", result? "":"库存不足");
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteLingLiao.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteLingLiao(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            LingLiao model = lingLiaoServiceImpl.getLingLiaoById(id);
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "已办理领料单不能删除！");
                return map;
            }
            boolean result = lingLiaoServiceImpl.deleteLingLiao(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getLingLiaoById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getLingLiaoById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            LingLiao lingLiao = lingLiaoServiceImpl.getLingLiaoById(id);
            map.put("result", 0);
            map.put("lingLiao", lingLiao);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listLingLiaosByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listLingLiaosByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.lingLiaoServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.lingLiaoServiceImpl.queryLingLiaosByPage(map));
        return model;
    }
    
    //分页查询
    @RequestMapping(value = "listLingLiaoDetailsByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listLingLiaoDetailsByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.lingLiaoServiceImpl.queryDetailRows(map));//查询记录数
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
        model.setList(this.lingLiaoServiceImpl.queryLingLiaoDetailsByPage(map));
        return model;
    }
    
    @RequestMapping(value = "getLingLiaoDetailTop100.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getKuCunTop100(@RequestBody LingLiaoDetail model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            A01 loginA01 = getDlA01();
            model.setQy_id(loginA01.getQy_id());
            List<LingLiaoDetail> list = lingLiaoServiceImpl.getLingLiaoDetailTop100(model);
            map.put("result", 0);
            map.put("sz", list);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

}
