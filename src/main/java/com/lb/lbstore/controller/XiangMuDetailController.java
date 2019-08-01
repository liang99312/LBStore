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

import com.lb.lbstore.domain.XiangMuDetail;
import com.lb.lbstore.service.XiangMuDetailService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/xiangMuDetail")
public class XiangMuDetailController extends BaseController {

    @Resource
    private XiangMuDetailService xiangMuDetailServiceImpl;

    @RequestMapping("goXiangMuDetail.do")
    public String goXiangMuDetail() {
        if (!existsUser()) {
            return "../index";
        }
        return "xiangMu/xiangMuDetail/xiangMuDetail";
    }
    
    @RequestMapping(value = "stopXiangMuDetail.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> stopXiangMuDetail(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            XiangMuDetail model = xiangMuDetailServiceImpl.getXiangMuDetailById(id);
            if(model.getState() == 0){
                map.put("result", -1);
                map.put("msg", "未办理项目单不需要终止！");
                return map;
            }
            boolean result = xiangMuDetailServiceImpl.changeXiangMuDetailState(id,4);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
     @RequestMapping(value = "finishXiangMuDetail.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> finishXiangMuDetail(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            XiangMuDetail model = xiangMuDetailServiceImpl.getXiangMuDetailById(id);
            if(model.getState() == 0){
                map.put("result", -1);
                map.put("msg", "未办理项目单不可以完成！");
                return map;
            }
            boolean result = xiangMuDetailServiceImpl.changeXiangMuDetailState(id,3);
            map.put("result", result? 0:-1);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getXiangMuDetailById.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getXiangMuDetailById(@RequestParam Integer id) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            XiangMuDetail xiangMuDetail = xiangMuDetailServiceImpl.getXiangMuDetailById(id);
            map.put("result", 0);
            map.put("xiangMuDetail", xiangMuDetail);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }
    
    @RequestMapping(value = "getXiangMuDetailsByState.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Map<String, Object> getXiangMuDetailsByState(@RequestParam Integer state) {
        if (!existsUser()) {
            return notLoginResult();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Integer qy_id = getDlA01().getQy_id();
            List<XiangMuDetail> xiangMuDetails = xiangMuDetailServiceImpl.getXiangMuDetailsByState(state,qy_id);
            map.put("result", 0);
            map.put("sz", xiangMuDetails);
        } catch (Exception e) {
            map.put("result", -1);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    //分页查询
    @RequestMapping(value = "listXiangMuDetailsByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTeachersByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        if (model.getRows() == 0) {
            model.setRows(this.xiangMuDetailServiceImpl.queryRows(map));//查询记录数
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
        model.setList(this.xiangMuDetailServiceImpl.queryXiangMuDetailsByPage(map));
        return model;
    }

}
