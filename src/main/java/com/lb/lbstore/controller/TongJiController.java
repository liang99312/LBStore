/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.controller;

import com.lb.lbstore.domain.Page;
import com.lb.lbstore.service.BaoBiaoService;
import java.util.ArrayList;
import java.util.HashMap;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/tongJi")
public class TongJiController extends BaseController {
    
    @Resource
    private BaoBiaoService baoBiaoServiceImpl;

    @RequestMapping("goTongJi.do")
    public String goTongJi() {
        if (!existsUser()) {
            return "../index";
        }
        return "cangKu/tongJi/tongJi";
    }
    
    @RequestMapping(value = "listTjfxBaoBiaosByPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Page listTjfxBaoBiaosByPage(@RequestBody Page model) {
        HashMap map = model.getParamters();
        if (map == null) {
            map = new HashMap();
        }
        map.put("qy_id", getDlA01().getQy_id());
        map.put("mkdm","509");
        if (model.getRows() == 0) {
            model.setRows(this.baoBiaoServiceImpl.queryMkRows(map));//查询记录数
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
        model.setList(this.baoBiaoServiceImpl.queryMkBaoBiaosByPage(map));
        return model;
    }

}
