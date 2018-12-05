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

import com.lb.lbstore.domain.CangKu;
import com.lb.lbstore.domain.CangKuA01;
import com.lb.lbstore.domain.KuWei;
import com.lb.lbstore.service.CangKuService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/cangKu")
public class CangKuController extends BaseController {

    @Resource
    private CangKuService cangKuServiceImpl;

    @RequestMapping("goCangKu.do")
    public String goCangKu() {
        if (!existsUser()) {
            return "../index";
        }
        return "cangKu/cangKu/cangKu";
    }

    @RequestMapping(value = "getAllCangKus.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getAllCangKus() {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<CangKu> cangKuList = new ArrayList<CangKu>();
            cangKuList = cangKuServiceImpl.getAllCangKus(getDlA01().getQy_id());
            map.put("result", 0);
            map.put("sz", cangKuList);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveCangKu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveCangKu(@RequestBody CangKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            model.setQy_id(getDlA01().getQy_id());
            if(cangKuServiceImpl.existCangKu(model.getQy_id(), -1, model.getMc())){
                map.put("result", -1);
                map.put("msg", "仓库名称已存在");
            }else{
                model.setState(0);
                CangKu cangKu = cangKuServiceImpl.saveCangKu(model);
                map.put("result", 0);
                map.put("cangKu", cangKu);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "updateCangKu.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> updateCangKu(@RequestBody CangKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            if(cangKuServiceImpl.existCangKu(model.getQy_id(), model.getId(), model.getMc())){
                map.put("result", -1);
                map.put("msg", "仓库名称已存在");
            }else{
                boolean result = cangKuServiceImpl.updateCangKu(model);
                map.put("result", result ? 0 : -1);
            }
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "deleteCangKu.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> deleteCangKu(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            boolean result = cangKuServiceImpl.deleteCangKu(id);
            map.put("result", result ? 0 : -1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getCangKuById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getCangKuById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            CangKu cangKu = cangKuServiceImpl.getCangKuById(id);
            map.put("result", 0);
            map.put("cangKu", cangKu);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listCangKusByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.cangKuServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.cangKuServiceImpl.queryCangKusByPage(map));
        return model;
    }

    @RequestMapping(value = "getCangKuKuWeiById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getCangKuKuWeiById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<KuWei> kws = cangKuServiceImpl.getCangKuKuWeiById(id);
            map.put("result", 0);
            map.put("sz", kws);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "getCangKuA01ById.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getCangKuA01ById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            List<A01> a01s = cangKuServiceImpl.getCangKuA01ById(id);
            map.put("result", 0);
            map.put("sz", a01s);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @RequestMapping(value = "saveCangKuSetting.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> saveCangKuSetting(@RequestBody CangKu model) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Integer qy_id = getDlA01().getQy_id();
            List<CangKuA01> a01s = new ArrayList();
            for (A01 a01 : model.getA01s()) {
                CangKuA01 a = new CangKuA01();
                a.setA01_id(a01.getId());
                a.setCk_id(model.getId());
                a.setQy_id(qy_id);
                a01s.add(a);
            }
            List<KuWei> kws = new ArrayList();
            for (KuWei kw : model.getKws()) {
                KuWei k = new KuWei();
                k.setCk_id(model.getId());
                k.setQy_id(qy_id);
                k.setQsh(kw.getQsh());
                k.setMc(kw.getMc());
                k.setJsh(kw.getJsh());
                kws.add(k);
            }
            boolean result = cangKuServiceImpl.saveCangKuA01Kw(a01s, kws, model.getId());
            map.put("result", result ? 0 : -1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

}
