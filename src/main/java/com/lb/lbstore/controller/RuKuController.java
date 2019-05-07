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

import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuDetail;
import com.lb.lbstore.domain.RuKuFei;
import com.lb.lbstore.service.RuKuService;
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
@RequestMapping("/ruKu")
public class RuKuController extends BaseController {

    @Resource
    private RuKuService ruKuServiceImpl;

    @RequestMapping("goRuKu.do")
    public String goRuKu() {
        if (!existsUser()) {
            return "../index";
        }
        return "cangKu/ruKu/ruKu";
    }

    @RequestMapping(value = "saveRuKu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveRuKu(@RequestBody RuKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            model.setState(0);
            model.setSj(new Date());
            RuKu ruKu = ruKuServiceImpl.saveRuKu(model);
            map.put("result", 0);
            map.put("ruKu", ruKu);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getRuKuDetailById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getRuKuDetailById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            RuKu ruKu = ruKuServiceImpl.getRuKuDetailById(id);
            map.put("result", 0);
            map.put("ruKu", ruKu);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateRuKu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateRuKu(@RequestBody RuKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "已办理入库单不能修改！");
                return map;
            }
            model.setSj(new Date());
            boolean result = ruKuServiceImpl.updateRuKu(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "dealRuKu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> dealRuKu(@RequestBody RuKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "入库单已办理！");
                return map;
            }
            boolean result = ruKuServiceImpl.dealRuKu(model,getDlA01().getId());
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteRuKu.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteRuKu(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            RuKu model = ruKuServiceImpl.getRuKuById(id);
            if(model.getState() != 0){
                map.put("result", -1);
                map.put("msg", "已办理入库单不能删除！");
                return map;
            }
            boolean result = ruKuServiceImpl.deleteRuKu(id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getRuKuById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getRuKuById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            RuKu ruKu = ruKuServiceImpl.getRuKuById(id);
            map.put("result", 0);
            map.put("ruKu", ruKu);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getRuKuByWzid_100.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getRuKuByWzid_100(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<RuKuDetail> details = ruKuServiceImpl.getRuKuByWzid_100(id);
            map.put("result", 0);
            map.put("details", details);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listRuKusByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.ruKuServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.ruKuServiceImpl.queryRuKusByPage(map));
        return model;
    }
    
    @RequestMapping(value = "saveRuKuFei.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveRuKuFei(@RequestBody RuKuFei model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            model.setRq(new Date());
            RuKuFei ruKuFei = ruKuServiceImpl.saveRuKuFei(model);
            map.put("result", 0);
            map.put("ruKuFei", ruKuFei);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getRuKuFeiById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getRuKuFeiById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            RuKuFei ruKuFei = ruKuServiceImpl.getRuKuFeiById(id);
            map.put("result", 0);
            map.put("ruKuFei", ruKuFei);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateRuKuFei.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateRuKuFei(@RequestBody RuKuFei model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = ruKuServiceImpl.updateRuKuFei(model);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "deleteRuKuFei.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteRuKuFei(@RequestParam Integer id,@RequestParam Integer rk_id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = ruKuServiceImpl.deleteRuKuFei(id,rk_id);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listRuKuFeisByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listRuKuFeisByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.ruKuServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.ruKuServiceImpl.queryRuKuFeisByPage(map));
        return model;
    }

}
